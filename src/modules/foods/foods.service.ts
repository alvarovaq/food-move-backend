import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFoodDto } from './dto/create-food.dto';
import { FindFoodDto } from './dto/find-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { FoodDocument } from './schemas/food.schemas';
import { DateRangeDto } from '../../shared/dto/date-range.dto';

@Injectable()
export class FoodsService {

  constructor (@InjectModel('foods') private readonly foodModel: Model<FoodDocument>) {}

  async create(createFoodDto: CreateFoodDto) {
    const food = await this.foodModel.create(createFoodDto);
    return food;
  }

  async findAll() {
    const foods = await this.foodModel.find({});
    return foods;
  }

  async findOne(id: string) {
    const food = await this.foodModel.findById(id);
    if (!food) throw new NotFoundException('No se ha encontrado la comida');
    return food;
  }

  async find (findFoodDto: FindFoodDto) {
    const foods = await this.foodModel.find(findFoodDto);
    return foods;
  }

  async update(id: string, updateFoodDto: UpdateFoodDto) {
    const updatedFood = await this.foodModel.findByIdAndUpdate(id, updateFoodDto, {new: true});
    if (!updatedFood) throw new NotFoundException('No se ha encontrado la comida');
    return updatedFood;
  }

  async remove(id: string) {
    const deletedFood = await this.foodModel.findByIdAndDelete(id);
    if (!deletedFood) throw new NotFoundException('No se ha encontrado la comida');
    return deletedFood;
  }

  async removeByPatient(idPatient: string) {
    const foods = await this.foodModel.find({patient: idPatient});
    foods.forEach(async (food) => {
      await this.foodModel.findByIdAndRemove(food._id);
    });
  }

  async findByPatient (idPatient: string, dateRangeDto: DateRangeDto) {
    const foods = await this.foodModel.find({
      patient: idPatient,
      date: {
        $gte: dateRangeDto.startDate,
        $lte: dateRangeDto.endDate
      }
    });
    console.log(foods);
    return foods;
  }

  async findIngredients (idPatient: string, dateRangeDto: DateRangeDto) {
    const foods = await this.findByPatient(idPatient, dateRangeDto);
    let ingredients = [];
    foods.forEach((food) => {
      ingredients = [...ingredients, ...food.ingredients.map((ingredient) => {
        return {
          title: food.title,
          food: food._id,
          date: food.date,
          name: ingredient.name,
          quantity: ingredient.quantity,
          unit: ingredient.unit
        };
      })]
    });
    return ingredients;
  }

}
