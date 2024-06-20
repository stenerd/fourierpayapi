import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { MetadataModule } from 'src/metadata/metadata.module';

@Module({
  imports:[MetadataModule],
  providers: [DatabaseService]
})
export class DatabaseModule {}
