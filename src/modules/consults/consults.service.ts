import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundError } from 'rxjs';
import { CreateConsultDto } from './dto/create-consult.dto';
import { FindConsultDto } from './dto/find-consult.dto';
import { UpdateConsultDto } from './dto/update-consult.dto';
import { Consult, ConsultDocument } from './schemas/consult.schema';

@Injectable()
export class ConsultsService {

  constructor (@InjectModel('consults') private readonly consultModel: Model<ConsultDocument>) {}

  async create(createConsultDto: CreateConsultDto) {
    const consult = await this.consultModel.create(createConsultDto);
    return consult;
  }

  async findAll() {
    const consutls = await this.consultModel.find({});
    return consutls;
  }

  async findOne(id: string) {
    const consult = await this.consultModel.findById(id);
    if (!consult) throw new NotFoundException('No se ha encontrado la consulta');
    return consult;
  }

  async find (findConsultDto: FindConsultDto) {
    const consults = await this.consultModel.find(findConsultDto);
    return consults;
  }

  async findByPatient (patientId: string) {
    const consults = await this.consultModel.find({patient: patientId});
    return consults;
  }

  async update(id: string, updateConsultDto: UpdateConsultDto) {
    const updatedConsult = await this.consultModel.findByIdAndUpdate(id, updateConsultDto, {new: true});
    if (!updatedConsult) throw new NotFoundException('No se ha encontrado la consulta');
    return updatedConsult;
  }

  async remove(id: string) {
    const deletedConsutl = await this.consultModel.findByIdAndDelete(id);
    if (!deletedConsutl) throw new NotFoundException('No se ha encontrado la consulta');
    return deletedConsutl;
  }

  async removeByPatient (patientId: string) {
    const consults = await this.consultModel.find({patient: patientId});
    consults.forEach(async (consult) => {
      const deletedConsult = await this.consultModel.findByIdAndDelete(consult._id);
    });
  }
}
