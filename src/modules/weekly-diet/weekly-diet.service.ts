import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWeeklyDietDto } from './dto/create-weekly-diet.dto';
import { UpdateWeeklyDietDto } from './dto/update-weekly-diet.dto';
import { WeeklyDietDocument } from './schemas/weekly-diet.schemas';

@Injectable()
export class WeeklyDietService {
  constructor (
    @InjectModel('weekly-diet') private readonly weeklyDietModel: Model<WeeklyDietDocument>
  ) {}
  
  async findOne(id: string) {
    const weeklyDiet = await this.weeklyDietModel.findById(id);
    if (!weeklyDiet) throw new NotFoundException('No se ha encontrado la dieta');
    return weeklyDiet;
  }

  async create(createWeeklyDietDto: CreateWeeklyDietDto) {
    const weeklyDiet = await this.weeklyDietModel.create(createWeeklyDietDto);
    return weeklyDiet;
  }

  async update(id: number, updateWeeklyDietDto: UpdateWeeklyDietDto) {
    const updatedWeeklyDiet = await this.weeklyDietModel.findByIdAndUpdate(id, updateWeeklyDietDto, {new: true});
    if (!updatedWeeklyDiet) throw new NotFoundException('No se ha encontrado la dieta semanal');
    return updatedWeeklyDiet;
  }

  async remove(id: number) {
    const deletedWeeklyDiet = await this.weeklyDietModel.findByIdAndDelete(id);
    if (!deletedWeeklyDiet) throw new NotFoundException('No se ha encontrado la dieta semanal');
    return deletedWeeklyDiet;
  }
}
