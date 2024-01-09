export declare class CreateSchoolSessionSettingDto {
    name: string;
    tag: string;
    start_year: string;
    end_year: string;
}
declare const UpdateSchoolSessionSettingDto_base: import("@nestjs/common").Type<Partial<CreateSchoolSessionSettingDto>>;
export declare class UpdateSchoolSessionSettingDto extends UpdateSchoolSessionSettingDto_base {
}
export {};
