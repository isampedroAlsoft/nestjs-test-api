import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { Artist } from './entities/artist.entity';
import { Like } from 'typeorm';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {
    Logger.log('Albums Controller initialized');
  }

  @Post()
  create(@Body() album: Partial<Artist>) {
    return this.artistsService.create(album);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() album: Partial<Artist>) {
    return this.artistsService.update(id, album);
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
    const albums = this.artistsService.findAll({
      take: options.take,
      skip: options.skip,
      where: options?.name
        ? [{ name: Like('%' + options.name + '%') }]
        : undefined,
    });
    return albums;
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.artistsService.findAll({ where: { id } });
  }
}
