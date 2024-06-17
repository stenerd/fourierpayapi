
export enum Roles {
    // LECTURER = "lecturer",
    LEVEL = "level",
    FACULTY = "faculty",
    INSTITUTION = "institution",
    DEPARTMENT="department"
}

export interface IMetadata {
    createMetadata(name: Roles, data: Record<string, {}>),
    deleteMetadata(name:string,data: Record<string, {}>),
    findMetadata(name:string,data: Record<string, {}>)
}