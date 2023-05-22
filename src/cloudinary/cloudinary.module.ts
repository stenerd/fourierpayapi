// Nest libraries
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

// Providers
import { CloudinaryProvider } from './cloudinary.provider';

// Services
import { CloudinaryService } from './cloudinary.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
      limits: {
        fileSize: 1024 * 1024 * 10, // 10MB
      },
    }),
  ],
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryProvider, CloudinaryService, MulterModule],
})
export class CloudinaryModule {}
