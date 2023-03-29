import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { UpdateAttachmentDto } from './dto/update-attachment.dto';
import * as fs from 'fs';
import { DESTINATION_ATTACHMENTS } from '../../constants/uploads.constants';
import { join } from 'path';

@Injectable()
export class AttachmentsService {

  async findAll() {
    return new Promise<string[]>((resolve, reject) => {
      fs.readdir(DESTINATION_ATTACHMENTS, (error, files) => {
        if (error) {
          reject(error);
          throw new NotFoundException(error);
        }
        const pdfFiles = files.filter((file) => {
          const extension = file.split('.').pop();
          return extension === 'pdf';
        });
        resolve(pdfFiles);
      })
    }); 
  }

  async deleteFile (filename: string) {
    const filePath = join(DESTINATION_ATTACHMENTS, filename);
    return new Promise<void>((resolve, reject) => {
      fs.unlink(filePath, (error) => {
        if (error) {
          reject(error);
          throw new NotFoundException(error);
        }
        resolve();
      })
    });
  }
}
