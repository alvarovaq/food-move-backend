import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { FindRoutineDto } from './dto/find-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { RoutineDocument } from './schemas/routine.schemas';

@Injectable()
export class RoutinesService {

  constructor (@InjectModel('routines') private readonly routineModel: Model<RoutineDocument>) {}

  async create(createRoutineDto: CreateRoutineDto) {
    const routine = await this.routineModel.create(createRoutineDto);
    return routine;
  }

  async findAll() {
    const routines = await this.routineModel.find({});
    return routines;
  }

  async findOne(id: string) {
    const routine = await this.routineModel.findById(id);
    if (!routine) throw new NotFoundException('No se ha encontrado la rutina');
    return routine;
  }
  
  async find (findRoutineDto: FindRoutineDto) {
    const routines = await this.routineModel.find(findRoutineDto);
    return routines;
  }

  async update(id: string, updateRoutineDto: UpdateRoutineDto) {
    const updatedRoutine = await this.routineModel.findByIdAndUpdate(id, updateRoutineDto, {new: true});
    if (!updateRoutineDto) throw new NotFoundException('No se ha encontrado la rutina');
    return updatedRoutine;
  }

  async remove(id: string) {
    const deletedRoutine = await this.routineModel.findByIdAndDelete(id);
    if (!deletedRoutine) throw new NotFoundException('No se ha encontrado la rutina')
    return deletedRoutine;
  }
}
