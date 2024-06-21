import { PartialType } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateLecturerDto extends PartialType(CreateUserDto) {
    @IsString()
    @IsOptional()
    position:string

    @IsString()
    @IsOptional()
    institution_name:string

    @IsString()
    @IsOptional()
    faculty_name:string

    @IsString()
    @IsOptional()
    department_name:string
}