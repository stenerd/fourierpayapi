import { CreateUserDto } from "src/user/dto/create-user.dto";
declare const CreateLecturerDto_base: import("@nestjs/common").Type<Partial<CreateUserDto>>;
export declare class CreateLecturerDto extends CreateLecturerDto_base {
    position: string;
    institution_name: string;
    faculty_name: string;
    department_name: string;
}
export {};
