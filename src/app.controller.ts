import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { DESTINATION_PROFILE_IMAGE } from './constants/uploads.constants';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('profile-image/:imagename')
  getImage (@Param('imagename') imagename, @Res() res) {
    res.sendFile(imagename, {root: DESTINATION_PROFILE_IMAGE})
  }
}
