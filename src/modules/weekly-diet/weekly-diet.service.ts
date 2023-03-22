import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomQueryService } from 'src/services/custom-query.service';
import { CreateWeeklyDietDto } from './dto/create-weekly-diet.dto';
import { FilterWeeklyDietDto } from './dto/filter-weekly-diet.dto';
import { QueryWeeklyDietDto } from './dto/query-weekly-diet.dto';
import { UpdateWeeklyDietDto } from './dto/update-weekly-diet.dto';
import { WeeklyDietDocument } from './schemas/weekly-diet.schemas';

@Injectable()
export class WeeklyDietService {
  constructor (
    @Inject(CustomQueryService) private readonly customQueryService: CustomQueryService,
    @InjectModel('weekly-diet') private readonly weeklyDietModel: Model<WeeklyDietDocument>
  ) {}
  
  async findOne(id: string) {
    const weeklyDiet = await this.weeklyDietModel.findById(id);
    if (!weeklyDiet) throw new NotFoundException('No se ha encontrado la dieta');
    return weeklyDiet;
  }

  async lookUp (filter: FilterWeeklyDietDto) {
    const weeklyDiet = await this.weeklyDietModel.findOne(filter);
    if (!weeklyDiet) throw new NotFoundException('No se ha encontrado ninguna dieta semanal');
    return weeklyDiet;
  }

  async filter (queryWeeklyDietDto: QueryWeeklyDietDto) {
    return await this.customQueryService.filter(queryWeeklyDietDto, this.weeklyDietModel);
  }

  async create(createWeeklyDietDto: CreateWeeklyDietDto) {
    const weeklyDiet = await this.weeklyDietModel.create(createWeeklyDietDto);
    return weeklyDiet;
  }

  async update(id: string, updateWeeklyDietDto: UpdateWeeklyDietDto) {
    const updatedWeeklyDiet = await this.weeklyDietModel.findByIdAndUpdate(id, updateWeeklyDietDto, {new: true});
    if (!updatedWeeklyDiet) throw new NotFoundException('No se ha encontrado la dieta semanal');
    return updatedWeeklyDiet;
  }

  async remove(id: string) {
    const deletedWeeklyDiet = await this.weeklyDietModel.findByIdAndDelete(id);
    if (!deletedWeeklyDiet) throw new NotFoundException('No se ha encontrado la dieta semanal');
    return deletedWeeklyDiet;
  }
}
