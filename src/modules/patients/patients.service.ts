import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConsultsService } from 'src/modules/consults/consults.service';
import { FoodsService } from 'src/modules/foods/foods.service';
import { MovesService } from 'src/modules/moves/moves.service';
import { User } from 'src/modules/users/interfaces/user.interface';
import { UsersService } from 'src/modules/users/users.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { QueryPatientDto } from './dto/query-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientDocument } from './schemas/patient.schema';
import { CustomQueryService } from 'src/services/custom-query.service';
import { FilterPatientDto } from './dto/filter-patient.dto';
import { PatientPipe } from './pipes/patient.pipe';
import { FilesService } from '../files/files.service';

@Injectable()
export class PatientsService {

  constructor (
    private readonly patientPipe: PatientPipe,
    @Inject(UsersService) private readonly usersService: UsersService,
    @Inject(FilesService) private readonly filesService: FilesService,
    @Inject(CustomQueryService) private readonly customQueryService: CustomQueryService,
    @Inject(ConsultsService) private readonly consultsService: ConsultsService,
    @Inject(FoodsService) private readonly foodsService: FoodsService,
    @Inject(MovesService) private readonly movesService: MovesService,
    @InjectModel('patients') private readonly patientModel: Model<PatientDocument>
  ) {}

  async findOne(id: string) {
    const patient = await this.patientModel.findById(id);
    if (!patient) throw new NotFoundException('No se ha encontrado al paciente');
    return patient;
  }

  async lookUp (filter: FilterPatientDto) {
    const patient = await this.patientModel.findOne(filter);
    if (!patient) throw new NotFoundException('No se ha encontrado ningún resultado');
    return patient;
  }

  async filter (queryPatientDto: QueryPatientDto) {
    return await this.customQueryService.filter(queryPatientDto, this.patientModel);
  }

  async create(createPatientDto: CreatePatientDto) {
    const {email, password} = createPatientDto;
    const user = new User(email, password, false);
    await this.usersService.createUser(user);
    const createdPatient = await this.patientModel.create(this.patientPipe.transform(createPatientDto));
    return createdPatient;
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    if (Object.keys(updatePatientDto).indexOf('email') >= 0) {
      const prevPatient = await this.findOne(id);
      if (prevPatient.email != updatePatientDto.email) {
        const findUser = await this.usersService.findByEmail(updatePatientDto.email);
        if (findUser) throw new NotFoundException("Ya existe un usuario con ese email");
        await this.usersService.updateUserEmail(prevPatient.email, updatePatientDto.email);
      }
    }
    const updatedPatient = await this.patientModel.findByIdAndUpdate(id, updatePatientDto, {new:true});
    if (!updatedPatient) throw new NotFoundException('No se ha encontrado al paciente');
    return updatedPatient;
  }

  async remove(id: string) {
    const deletedPatient = await this.patientModel.findByIdAndDelete(id);
    if (!deletedPatient) throw new NotFoundException('No se ha encontrado al paciente');
    await this.usersService.removeUser(deletedPatient.email);
    await this.consultsService.removeByPatient(deletedPatient._id);
    await this.foodsService.removeByPatient(deletedPatient._id);
    await this.movesService.removeByPatient(deletedPatient._id);
    return deletedPatient;
  }

  async upload (id: string, file: Express.Multer.File) {
    await this.removeProfileImage(id, false);
    return await this.patientModel.findByIdAndUpdate(id, {profile_image: file.filename}, {new: true});
  }

  async removeProfileImage (id: string, updatePatient: boolean = true) {
    const patient = await this.patientModel.findById(id);
    await this.filesService.removeProfileImage(patient.profile_image);
    if(updatePatient) await this.patientModel.findByIdAndUpdate(id, {profile_image: undefined});
  }

}
