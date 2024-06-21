import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CoreController } from 'src/common/core/controller.core';

import { LecturerService } from './lecturer.service';
import { CreateLecturerDto } from './lecturer.dto';

@Controller('lecturer')
export class LecturerController extends CoreController {
    constructor(private readonly lecturerService: LecturerService) {
        super()
    }
    @Post("/onboard")
    async onboardLecturer(@Body() lecturer: CreateLecturerDto, @Res() res) {
        const data = await this.lecturerService.createLecturer(lecturer);
        return this.responseSuccess(
            res,
            "00",
            "Success",
            data,
            HttpStatus.CREATED
        )
    }
}
