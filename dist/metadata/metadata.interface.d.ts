export declare enum Roles {
    LEVEL = "level",
    FACULTY = "faculty",
    INSTITUTION = "institution",
    DEPARTMENT = "department"
}
export interface IMetadata {
    createMetadata(name: Roles, data: Record<string, {}>): any;
    deleteMetadata(name: string, data: Record<string, {}>): any;
    findMetadata(name: string, data: Record<string, {}>): any;
}
