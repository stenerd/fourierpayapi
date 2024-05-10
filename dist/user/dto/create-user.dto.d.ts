import { RoleEnum } from '../user.enum';
export declare class CreateUserDto {
    firstname: string;
    lastname: string;
    email: string;
    phonenumber: string;
    password: string;
    role: RoleEnum;
}
export declare class CreateCompleteUserDto extends CreateUserDto {
}
