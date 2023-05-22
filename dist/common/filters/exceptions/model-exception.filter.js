"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const model_not_found_exception_1 = require("../../exceptions/model-not-found.exception");
let ModelExceptionFilter = class ModelExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        response.status(status).json({
            success: 'false',
            response_code: '004',
            response_description: exception.message,
            message: exception.message,
        });
        console.log(`An Error Occured in ${request.url}`, exception);
    }
};
ModelExceptionFilter = __decorate([
    (0, common_1.Catch)(model_not_found_exception_1.ModelNotFound)
], ModelExceptionFilter);
exports.ModelExceptionFilter = ModelExceptionFilter;
//# sourceMappingURL=model-exception.filter.js.map