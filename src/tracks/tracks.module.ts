import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { Track } from './entities/track.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TracksController } from './tracks.controller';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  imports: [TypeOrmModule.forFeature([Track])],
})
export class TracksModule {}
