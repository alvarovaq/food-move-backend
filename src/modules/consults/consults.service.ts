import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundError } from 'rxjs';
import { CustomQueryService } from 'src/services/custom-query.service';
import { CreateConsultDto } from './dto/create-consult.dto';
import { FilterConsultDto } from './dto/filter-consult.dto';
import { QueryConsultDto } from './dto/query-consult.dto';
import { UpdateConsultDto } from './dto/update-consult.dto';
import { Consult, ConsultDocument } from './schemas/consult.schema';

@Injectable()
export class ConsultsService {

  constructor (
    @Inject(CustomQueryService) private readonly customQueryService: CustomQueryService,
    @InjectModel('consults') private readonly consultModel: Model<ConsultDocument>
  ) {}

  async findOne(id: string) {
    const consult = await this.consultModel.findById(id);
    if (!consult) throw new NotFoundException('No se ha encontrado la consulta');
    return consult;
  }

  async findByPatient (patientId: string) {
    const consults = await this.consultModel.find({patient: patientId});
    return consults;
  }

  async lookUp(filterConsultDto: FilterConsultDto) {
    const consult = await this.consultModel.findOne(filterConsultDto);
    if (!consult) throw new NotFoundException('No se ha encontrado ningún resultado');
    return consult;
  }

  async filter (queryConsultDto: QueryConsultDto) {
    return await this.customQueryService.filter(queryConsultDto, this.consultModel);
  }

  async create(createConsultDto: CreateConsultDto) {
    const consult = await this.consultModel.create(createConsultDto);
    return consult;
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
