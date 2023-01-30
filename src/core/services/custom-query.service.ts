import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CustomQueryDto } from '../dto/custom-query.dto';

@Injectable()
export class CustomQueryService {

    async filter (customQuery: any, model: Model<any>) {
        const {filter, search, paging, sorting} = customQuery;
        const patients = model.find(filter);
        
        let options = {};
        if (search) {
            options = {$or: search.fields.map((field) => {
                let res = {};
                res[field] = new RegExp(search.search, 'i');
                return res;
            })};
        }
        const data = patients.find(options);
        
        if (sorting) {
            let sort = {};
            sorting.forEach((s) => sort[s.field] = s.direction);
            data.sort(sort);
        }

        let items;
        if (paging) items = await data.skip((paging.page - 1) * paging.limit).limit(paging.limit).exec();
        else items = await data.exec();
        
        const total = await model.count(filter).count(options).exec();

        return {
            items,
            total,
            page: paging ? paging.page : 1,
            limit: paging ? paging.limit : total
        }
    }

}
