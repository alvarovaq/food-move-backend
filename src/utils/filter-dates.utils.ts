import { DateRangeDto } from "src/shared/dto/date-range.dto";

export function filterDateRange (dateRangeDto: DateRangeDto): {$gte?: Date, $lte?: Date} {
    let object = {};
    if (dateRangeDto.startDate) object = {$gte: dateRangeDto.startDate};
    if (dateRangeDto.endDate) object = {...object, $lte: dateRangeDto.endDate};
    return object;
}

export function getQueryDate (query: Object, dateRangeDto: DateRangeDto, key: string): Object {
    const date = filterDateRange(dateRangeDto);
    let object = {...query};
    if (Object.keys(date).length == 0) return object;
    object[key] = date;
    return object; 
}