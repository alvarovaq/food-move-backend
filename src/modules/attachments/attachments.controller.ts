import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AttachmentStorage, DESTINATION_ATTACHMENTS, MAX_SIZE_ATTACHMENT } from '../../constants/uploads.constants';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiBearerAuth()
@ApiTags('attachments')
@Controller('attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Get('findOne/:id')
  async findOne (@Param('id') id: string) {
    return await this.attachmentsService.findOne(id);
  }

  @Get('findAll/')
  async findAll () {
    return await this.attachmentsService.findAll();
  }

  @Post('create/:title')
  @UseInterceptors(FileInterceptor('file', AttachmentStorage))
  async create (@Param('title') title: string, @UploadedFile(new ParseFilePipe({validators: [new MaxFileSizeValidator({maxSize: MAX_SIZE_ATTACHMENT}), new FileTypeValidator({fileType: 'application/pdf'})]})) file: Express.Multer.File) {
    return await this.attachmentsService.create(title, file);
  }

  @Patch('update/:id/:title')
  async update (@Param('id') id: string, @Param('title') title: string) {
    return await this.attachmentsService.update(id, title);
  }

  @Delete('remove/:id')
  async remove (@Param('id') id: string) {
    return await this.attachmentsService.remove(id);
  }
}
