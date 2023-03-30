import { Module } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { AttachmentsController } from './attachments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AttachmentSchema } from './schemas/attachment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'attachments',
        schema: AttachmentSchema
      }
    ])
  ],
  controllers: [AttachmentsController],
  providers: [AttachmentsService]
})
export class AttachmentsModule {}
