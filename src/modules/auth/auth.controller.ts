import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthUserDto } from './dto/auth-user.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor (private readonly authService: AuthService) {}

    @Post('login')
    async login (@Body() authUserDto: AuthUserDto) {
        return await this.authService.login(authUserDto);
    }

}
