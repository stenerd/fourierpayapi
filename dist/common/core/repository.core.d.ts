import { Document, FilterQuery, Model, PopulateOptions, QueryOptions, UpdateQuery } from 'mongoose';
export declare abstract class CoreRepository<T extends Document> {
    protected readonly entityModel: Model<T>;
    constructor(entityModel: Model<T>);
    findOne(entityFilterQuery: FilterQuery<T>, projection?: Record<string, unknown>, options?: QueryOptions): Promise<T | null>;
    find(entityFilterQuery: FilterQuery<T>, projection?: Record<string, unknown>, options?: QueryOptions): Promise<T[]>;
    create(createEntityData: unknown): Promise<T>;
    createMany(createEntityData: unknown): Promise<T>;
    findOneAndUpdate(entityFilterQuery: FilterQuery<T>, updateEntityData: UpdateQuery<unknown>, options: QueryOptions): Promise<T | null>;
    deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean>;
    newDocument<D>(data: D): T;
    model(): Model<T>;
    save(entity: any, options?: QueryOptions): Promise<T>;
    saveData(entity: Record<string, any>, options?: QueryOptions): Promise<T>;
    populate(entity: any, path?: string | PopulateOptions | (string | PopulateOptions)[]): Promise<T>;
}
