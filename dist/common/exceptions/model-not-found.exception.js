"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelNotFound = void 0;
const common_1 = require("@nestjs/common");
class ModelNotFound extends common_1.HttpException {
    constructor(message) {
        super(message ? message : 'Resource Not Found', common_1.HttpStatus.NOT_FOUND);
    }
}
exports.ModelNotFound = ModelNotFound;
//# sourceMappingURL=model-not-found.exception.js.map