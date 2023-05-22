import { HttpException } from '@nestjs/common';
export declare class ModelNotFound extends HttpException {
    constructor(message?: string);
}
