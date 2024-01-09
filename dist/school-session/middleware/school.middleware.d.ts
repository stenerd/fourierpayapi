import { NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { SchoolDataRepository } from 'src/school-data/school-data.repository';
export declare class SchoolMiddleware implements NestMiddleware {
    private readonly jwtService;
    private readonly schoolRepo;
    constructor(jwtService: JwtService, schoolRepo: SchoolDataRepository);
    use(req: Request, res: Response, next: NextFunction): void;
}
