import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, ValidateNested, IsEnum, IsIn, IsArray } from 'class-validator';
import { DEFAULT_LIMIT } from "../constants";

class Search {

    @ApiProperty()
    @IsString()
    search: string;

    @ApiProperty()
    @IsArray()
    fields: string[];

}

class Paging {

    @ApiProperty()
    @IsNumber()
    page: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    limit: number = DEFAULT_LIMIT;

}

class Sorting {

    @ApiProperty()
    @IsString()
    field: string;

    @ApiProperty()
    @IsString()
    @IsIn(["asc", "desc", "ascending", "descending"])
    @IsOptional()
    direction: string = "asc";

}

export class QueryDto {

    @ApiProperty()
    @Type(() => Search)
    @IsOptional()
    search: Search;

    @ApiProperty()
    @Type(() => Paging)
    @IsOptional()
    paging: Paging;

    @ApiProperty()
    @Type(() => Sorting)
    @ValidateNested({ each: true })
    @IsOptional()
    sorting: Sorting[];

}