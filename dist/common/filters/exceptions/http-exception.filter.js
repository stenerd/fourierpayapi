"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const base_exception_1 = require("../../exceptions/base.exception");
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        let response_code;
        response_code =
            status == common_1.HttpStatus.NOT_FOUND
                ? (response_code = '004')
                : status == common_1.HttpStatus.BAD_REQUEST
                    ? (response_code = '006')
                    : status == common_1.HttpStatus.BAD_GATEWAY
                        ? (response_code = '007')
                        : status == common_1.HttpStatus.FORBIDDEN
                            ? (response_code = '009')
                            : status == common_1.HttpStatus.GATEWAY_TIMEOUT
                                ? (response_code = '008')
                                : status == common_1.HttpStatus.HTTP_VERSION_NOT_SUPPORTED
                                    ? (response_code = '010')
                                    : status == common_1.HttpStatus.NOT_ACCEPTABLE
                                        ? (response_code = '016')
                                        : status == common_1.HttpStatus.REQUEST_TIMEOUT
                                            ? (response_code = '013')
                                            : status == common_1.HttpStatus.UNAUTHORIZED
                                                ? (response_code = '011')
                                                : status == common_1.HttpStatus.UNPROCESSABLE_ENTITY
                                                    ? (response_code = '012')
                                                    : status == common_1.HttpStatus.UNSUPPORTED_MEDIA_TYPE
                                                        ? (response_code = '015')
                                                        : status == common_1.HttpStatus.URI_TOO_LONG
                                                            ? (response_code = '014')
                                                            : status == common_1.HttpStatus.SERVICE_UNAVAILABLE
                                                                ? (response_code = '016')
                                                                : status == common_1.HttpStatus.NOT_MODIFIED
                                                                    ? (response_code = '017')
                                                                    : status == common_1.HttpStatus.NOT_IMPLEMENTED
                                                                        ? (response_code = '018')
                                                                        : status == common_1.HttpStatus.INTERNAL_SERVER_ERROR
                                                                            ? 'An error encountered'
                                                                            : 'Internal Server error';
        let message;
        if (exception instanceof common_1.BadRequestException) {
            const xx = exception.getResponse();
            if (xx.hasOwnProperty('message')) {
                message = xx === null || xx === void 0 ? void 0 : xx.message;
            }
        }
        if (exception instanceof base_exception_1.BaseException) {
            response_code = exception.getStatusCode();
        }
        response.status(status).json({
            success: 'false',
            response_code: response_code,
            response_description: exception.message || 'An Error Occured',
            message: message || exception.message || '',
        });
        console.log(`An Error Occured in ${request.url}`, exception);
    }
};
HttpExceptionFilter = __decorate([
    (0, common_2.Catch)(common_2.HttpException)
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;
//# sourceMappingURL=http-exception.filter.js.map