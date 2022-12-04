import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConsultsService } from 'src/consults/consults.service';
import { FoodsService } from 'src/foods/foods.service';
import { MovesService } from 'src/moves/moves.service';
import { User } from 'src/users/interfaces/user.interface';
import { UsersService } from 'src/users/users.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { FindPatientDto } from './dto/find-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './interfaces/patient.interface';
import { PatientDocument } from './schemas/patient.schema';

@Injectable()
export class PatientsService {

  constructor (
    @Inject(UsersService) private readonly usersService: UsersService,
    @Inject(ConsultsService) private readonly consultsService: ConsultsService,
    @Inject(FoodsService) private readonly foodsService: FoodsService,
    @Inject(MovesService) private readonly movesService: MovesService,
    @InjectModel('patients') private readonly patientModel: Model<PatientDocument>
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const {email, password} = createPatientDto;
    const user = new User(email, password, false);
    await this.usersService.createUser(user);
    const patient = new Patient(createPatientDto);
    const createdPatient = await this.patientModel.create(patient);
    return createdPatient;
  }

  async findAll() {
    const patients = await this.patientModel.find({});
    return patients;
  }

  async findOne(id: string) {
    const patient = await this.patientModel.findById(id);
    if (!patient) throw new NotFoundException('No se ha encontrado al paciente');
    return patient;
  }

  async find (findPatientDto: FindPatientDto) {
    return await this.patientModel.find(findPatientDto);
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
}
