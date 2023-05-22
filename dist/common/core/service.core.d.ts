import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { CoreRepository } from './repository.core';
export declare abstract class CoreService<T extends CoreRepository<any>> {
    protected readonly respository: T;
    constructor(respository: T);
    create(data: any): Promise<any>;
    findOne(entityFilterQuery: FilterQuery<T>, projection?: Record<string, unknown>, options?: QueryOptions): Promise<any>;
    find(entityFilterQuery: FilterQuery<T>, projection?: Record<string, unknown>, options?: QueryOptions): Promise<any[]>;
    getRepository(): T;
    findOneAndUpdate(query: FilterQuery<T>, update: UpdateQuery<unknown>, options?: QueryOptions): Promise<any>;
    updateOne(_id: string, data: UpdateQuery<unknown>, options?: QueryOptions): Promise<any>;
}
