import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { ModelNotFound } from '../../exceptions/model-not-found.exception';
export declare class ModelExceptionFilter implements ExceptionFilter {
    catch(exception: ModelNotFound, host: ArgumentsHost): void;
}
