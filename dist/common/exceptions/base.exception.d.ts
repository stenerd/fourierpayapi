import { HttpException } from '@nestjs/common';
export declare class BaseException extends HttpException {
    protected statusCode: string;
    constructor(message?: string, statusCode?: string);
    getStatusCode(): string;
    setStatusCode(statusCode: string): void;
}
