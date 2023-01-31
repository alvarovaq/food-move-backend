import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Get('findAll')
  async findAll () {
    const users = await this.usersService.findAll();
    return users;
  }

}
