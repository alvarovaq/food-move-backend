import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomQueryService } from 'src/services/custom-query.service';
import { CreateDietDto } from './dto/create-diet.dto';
import { FilterDietDto } from './dto/filter-diet.dto';
import { QueryDietDto } from './dto/query-diet.dto';
import { UpdateDietDto } from './dto/update-diet.dto';
import { DietDocument } from './schemas/diet.schemas';

@Injectable()
export class DietsService {
  constructor (
    @Inject(CustomQueryService) private readonly customQueryService: CustomQueryService,
    @InjectModel('diets') private readonly dietsModel: Model<DietDocument>
  ) {}
  
  async findOne(id: string) {
    const diet = await this.dietsModel.findById(id);
    if (!diet) throw new NotFoundException('No se ha encontrado la dieta');
    return diet;
  }

  async lookUp (filter: FilterDietDto) {
    const diet = await this.dietsModel.findOne(filter);
    if (!diet) throw new NotFoundException('No se ha encontrado ninguna dieta');
    return diet;
  }

  async filter (queryDietDto: QueryDietDto) {
    return await this.customQueryService.filter(queryDietDto, this.dietsModel);
  }

  async create(createDietDto: CreateDietDto) {
    const diet = await this.dietsModel.create(createDietDto);
    return diet;
  }

  async update(id: string, updateDietDto: UpdateDietDto) {
    const updatedDiet = await this.dietsModel.findByIdAndUpdate(id, updateDietDto, {new: true});
    if (!updatedDiet) throw new NotFoundException('No se ha encontrado la dieta');
    return updatedDiet;
  }

  async remove(id: string) {
    const deletedDiet = await this.dietsModel.findByIdAndDelete(id);
    if (!deletedDiet) throw new NotFoundException('No se ha encontrado la dieta');
    return deletedDiet;
  }
}
