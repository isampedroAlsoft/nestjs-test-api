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
import { AlbumsService } from './albums.service';
import { Like } from 'typeorm/find-options/operator/Like';
import { Album } from './entities/album.entity';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {
    Logger.log('Albums Controller initialized');
  }

  @Post()
  create(@Body() album: Partial<Album>) {
    return this.albumsService.create(album);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() album: Partial<Album>) {
    return this.albumsService.update(id, album);
  }

  @Get()
  findAll(
    @Query()
    options: {
      take?: number;
      skip?: number;
      title?: string;
    },
  ) {
    const albums = this.albumsService.findAll({
      take: options.take,
      skip: options.skip,
      where: options?.title
        ? [{ title: Like('%' + options.title + '%') }]
        : undefined,
    });
    return albums;
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.albumsService.findAll({ where: { id } });
  }
}
