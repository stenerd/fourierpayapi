"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreRepository = void 0;
class CoreRepository {
    constructor(entityModel) {
        this.entityModel = entityModel;
    }
    async findOne(entityFilterQuery, projection, options) {
        return this.entityModel
            .findOne(entityFilterQuery, Object.assign({ __v: 0 }, projection), options)
            .exec();
    }
    async find(entityFilterQuery, projection, options) {
        return this.entityModel.find(entityFilterQuery, projection, options);
    }
    async create(createEntityData) {
        const entity = new this.entityModel(createEntityData);
        return entity.save();
    }
    async createMany(createEntityData) {
        return this.entityModel.create(createEntityData);
    }
    async findOneAndUpdate(entityFilterQuery, updateEntityData, options) {
        return this.entityModel.findOneAndUpdate(entityFilterQuery, updateEntityData, Object.assign({ new: true }, options));
    }
    async deleteMany(entityFilterQuery) {
        const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);
        return deleteResult.deletedCount >= 1;
    }
    async delete(entityFilterQuery) {
        const deleteOne = await this.entityModel.deleteOne(entityFilterQuery);
        return deleteOne;
    }
    newDocument(data) {
        return new this.entityModel(data);
    }
    model() {
        return this.entityModel;
    }
    async save(entity, options) {
        return entity.save(options);
    }
    async saveData(entity, options) {
        return this.newDocument(entity).save(options);
    }
    async populate(entity, path) {
        return entity.populate(path);
    }
}
exports.CoreRepository = CoreRepository;
//# sourceMappingURL=repository.core.js.map