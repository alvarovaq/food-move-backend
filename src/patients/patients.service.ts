import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { query, Request } from 'express';
import { Model } from 'mongoose';
import { ConsultsService } from 'src/consults/consults.service';
import { FoodsService } from 'src/foods/foods.service';
import { MovesService } from 'src/moves/moves.service';
import { User } from 'src/users/interfaces/user.interface';
import { UsersService } from 'src/users/users.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { FilterPatientDto } from './dto/filter-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './interfaces/patient.interface';
import { PatientDocument } from './schemas/patient.schema';
import { CustomQuery } from 'src/core/interfaces/custom-query.interface';

@Injectable()
export class PatientsService {

  constructor (
    @Inject(UsersService) private readonly usersService: UsersService,
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

  async lookUp (filterPatientDto: FilterPatientDto) {
    const patient = await this.patientModel.findOne(filterPatientDto);
    if (!patient) throw new NotFoundException('No se ha encontrado ningún resultado');
    return patient;
  }

  async filter (query: FilterPatientDto) {
    const {filter, search, paging, sorting} = query;

    const patients = this.patientModel.find(filter);
    
    let options = {};
    if (search) {
      options = {$or: search.fields.map((field) => {
        let res = {};
        res[field] = new RegExp(search.search, 'i');
        return res;
      })};
    }
    const data = patients.find(options);
    
    if (sorting) {
      let sort = {};
      sorting.forEach((s) => {
        sort[s.field] = s.direction;
      });
      data.sort(sort);
    }

    let items;

    if (paging) {
      items = await data.skip((paging.page - 1) * paging.limit).limit(paging.limit).exec();
    } else {
      items = await data.exec();
    }
    
    const total = await this.patientModel.count(filter).count(options).exec();

    return {
      items,
      total,
      page: paging ? paging.page : 1,
      limit: paging ? paging.limit : total
    }
  }

  async count (filter: FilterPatientDto, options) {
    const c = this.patientModel.count(filter);
    return await c.count(options).exec()
  }

  async create(createPatientDto: CreatePatientDto) {
    const {email, password} = createPatientDto;
    const user = new User(email, password, false);
    await this.usersService.createUser(user);
    const patient = new Patient(createPatientDto);
    const createdPatient = await this.patientModel.create(patient);
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
}
