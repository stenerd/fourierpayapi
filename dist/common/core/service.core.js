"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreService = void 0;
class CoreService {
    constructor(respository) {
        this.respository = respository;
    }
    async create(data) {
        return await this.respository.create(data);
    }
    async findOne(entityFilterQuery, projection, options) {
        return await this.respository.findOne(entityFilterQuery, projection, options);
    }
    async find(entityFilterQuery, projection, options) {
        return await this.respository.find(entityFilterQuery, projection, options);
    }
    getRepository() {
        return this.respository;
    }
    async findOneAndUpdate(query, update, options) {
        return await this.respository.findOneAndUpdate(query, update, options);
    }
    async updateOne(_id, data, options = {}) {
        const updatedUser = await this.respository.findOneAndUpdate({ _id }, data, Object.assign({}, options));
        return updatedUser;
    }
}
exports.CoreService = CoreService;
//# sourceMappingURL=service.core.js.map