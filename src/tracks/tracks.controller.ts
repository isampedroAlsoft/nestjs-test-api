import {
  Body,
  Controller,
  Logger,
  Param,
  Patch,
  Post,
  Get,
  Query,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { Track } from './entities/track.entity';

@Controller('tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {
    Logger.log('Tracks Controller initialized');
  }

  @Post()
  create(@Body() track: Partial<Track>) {
    return this.tracksService.create(track);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() track: Partial<Track>) {
    return this.tracksService.update(id, track);
  }

  @Get()
  findAll(
    @Query()
    options: {
      take?: number;
      skip?: number;
      name?: string;
    },
  ) {
    return this.tracksService.findAll(options.take, options.skip, options.name);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tracksService.findOne(id);
  }
}
