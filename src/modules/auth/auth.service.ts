import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class AuthService {

    constructor (@Inject(UsersService) private readonly usersService: UsersService, private jwtAuthService: JwtService) {}

    async login (authUserDto: AuthUserDto) {
        const {email, password} = authUserDto;
        const user = await this.usersService.login(email, password);
        const payload = {id: user._id, name: user.email}
        const token = await this.jwtAuthService.sign(payload);
        const data = {
            user,
            token
        }
        return data;
    }

}
