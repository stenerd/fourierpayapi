import { BadRequestException, Body, Controller, Get, Inject, Param, Post, Put, UnauthorizedException, UseGuards } from "@nestjs/common";
import { SchoolSessionService } from "./school-session.service";
import { AuthGuard } from "src/common/guards/auth.guards";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { IJWTUser } from "src/auth/auth.interface";
import { RoleEnum, UserStatusEnum } from "src/user/user.enum";
import { SchoolDataRepository } from "src/school-data/school-data.repository";
import { UserRepository } from "src/user/user.repository";
import { CreateSchoolSessionSettingDto, UpdateSchoolSessionSettingDto } from "./dtos/school-session.dto";
import { ICreateSchoolSessionResponse } from "./interfaces/school-session.interface";

@Controller("school-session")
export class SchoolSessionController {
    constructor(
        private readonly sessionService: SchoolSessionService,
        private readonly schoolData: SchoolDataRepository,
        private readonly userRepo: UserRepository,
        // private readonly 
    ) { }

    @Post("create")
    @UseGuards(AuthGuard)
    async createSession(@Body() data: CreateSchoolSessionSettingDto, @CurrentUser() user: IJWTUser): Promise<ICreateSchoolSessionResponse> {
        try {
            if (user.role !== RoleEnum.SCHOOL) throw new UnauthorizedException()
            const currentUser = await this.userRepo.findOne({ _id: user._id })
            const school = await this.schoolData.findOne({ _id: currentUser.role_id })
            return await this.sessionService.createSession({ school_id: school._id, data })
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    @Get("/")
    @UseGuards(AuthGuard)
    async getSession(@CurrentUser() user: IJWTUser) {
        try {
            if (user.role !== RoleEnum.SCHOOL) throw new UnauthorizedException()
            const currentUser = await this.userRepo.findOne({ _id: user._id })
            const school = await this.schoolData.findOne({ _id: currentUser.role_id })
            return await this.sessionService.getSession(school._id)
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    @Put("/edit/:setting_id")
    @UseGuards(AuthGuard)
    async editSession(@Body() data: UpdateSchoolSessionSettingDto, @CurrentUser() user: IJWTUser, @Param("setting_id") setting_id: string) {
        try {
            if (user.role !== RoleEnum.SCHOOL) throw new UnauthorizedException()
            return await this.sessionService.editSession(setting_id, data)
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}