// Nest Libraries
import { BadRequestException, Injectable } from '@nestjs/common';

// third-party libraries
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  /**
   * Upload file
   * @param file
   * @returns
   */
  async uploadFile(
    file,
    folderName: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      console.log('file >> ', file, folderName);
      const upload = v2.uploader.upload_stream(
        {
          resource_type: 'raw',
          public_id: `${folderName}/${file.originalname}`,
          overwrite: true,
        },
        (error, result: any) => {
          if (error) {
            console.log('error >> ', error);
            reject(new BadRequestException(error));
          }
          resolve(result);
        },
      );
      toStream(file.buffer).pipe(upload);
    });
  }

  /**
   * Deletes an uploaded file
   * @param publicId
   * @returns
   */
  async deleteFile(publicId: string): Promise<any> {
    try {
      const deleted = await v2.uploader.destroy(`${publicId}`, {
        invalidate: true,
      });
      return deleted;
    } catch (error) {
      throw new Error(error);
    }
  }
}
