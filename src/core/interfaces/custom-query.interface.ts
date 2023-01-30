import { SortOrder } from "mongoose";

export interface CustomQuery {
    search?: RegExp;
    sort?: SortOrder;
    page?: number;
    limit?: number;
}
