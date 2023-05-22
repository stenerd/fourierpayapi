import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
export declare class CloudinaryService {
    uploadFile(file: any, folderName: string): Promise<UploadApiResponse | UploadApiErrorResponse>;
    deleteFile(publicId: string): Promise<any>;
}
