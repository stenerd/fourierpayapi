import { Module } from '@nestjs/common';
import { LinkService } from './link.service';
import { LinkController } from './link.controller';
import { LinkRepository } from './link.repository';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LinkSchema } from './link.model';
import { LinkFactory } from './link.factory';

@Module({
  imports: [
    // UserModule,
    MongooseModule.forFeature([{ name: 'Link', schema: LinkSchema }]),
  ],
  controllers: [LinkController],
  providers: [LinkService, LinkRepository, LinkFactory],
  exports: [LinkService, LinkRepository],
})
export class LinkModule {}
