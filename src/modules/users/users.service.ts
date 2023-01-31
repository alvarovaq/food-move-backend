import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare, hash } from 'bcrypt';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {

    constructor (@InjectModel('users') private readonly userModel: Model<UserDocument>) {}

    async findAll () {
        const users = await this.userModel.find();
        return users;
    }

    async login (email: string, password: string) {
        const user = await this.userModel.findOne({email});
        if (!user) throw new NotFoundException('No se ha encontrado al usuario');
        const isMatch = await compare(password, user.password);
        if (!isMatch) throw new NotFoundException('Contraseña incorrecta');
        return user;
    }

    async findByEmail (email: string) {
       const user = await this.userModel.findOne({email});
       return user; 
    }

    async createUser (user: User) {
        const { email, password } = user;
        const findUser = await this.userModel.findOne({email});
        if (findUser) throw new NotFoundException('Ya existe un usuario con ese email');
        const new_password = await hash(password, 10);
        user = {...user, password: new_password};
        const createdUser = await this.userModel.create(user);
        return createdUser;
    }

    async updateUserEmail (prevEmail: string, email: string) {
        const prevUser = await this.findByEmail(prevEmail);
        if (prevUser) {
            await this.userModel.findByIdAndUpdate(prevUser, {email});
        }
    }

    async removeUser (email: string) {
        const user = await this.userModel.findOne({email});
        if (!user) throw new NotFoundException('No se ha encontrado al usuario');
        const deletedUser = await this.userModel.findByIdAndDelete(user._id);
        return deletedUser;
    }

}
