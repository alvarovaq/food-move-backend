import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { DEFAULT_LIMIT } from '../constants';
import { CustomQuery } from '../interfaces/custom-query.interface';

@Injectable()
export class CustomQueryPipe implements PipeTransform {
  transform(query: any, metadata: ArgumentMetadata): CustomQuery{
    return {
      search: query.s ? new RegExp(query.s.toString(), 'i') : undefined,
      sort: query.sort ? query.sort == "asc" ? 1 : -1 : undefined,
      page: parseInt(query.page as any),
      limit: parseInt(query.limit as any) || DEFAULT_LIMIT
    };
  }
}
