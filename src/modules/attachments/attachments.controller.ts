import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { UpdateAttachmentDto } from './dto/update-attachment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { DESTINATION_ATTACHMENTS } from '../../constants/uploads.constants';

@ApiBearerAuth()
@ApiTags('attachments')
@Controller('attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Get()
  async getFiles() {
    return await this.attachmentsService.findAll();
  }

  @Get(':filename')
  async getFile(@Param('filename') filename: string, @Res() response: Response) {
    return response.sendFile(filename, {root: DESTINATION_ATTACHMENTS});
  }

  @Delete('removeFile/:filename')
  async removeFile (@Param('filename') filename: string) {
    return await this.attachmentsService.deleteFile(filename);
  }
}
