/* eslint-disable prettier/prettier */
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
import { Album } from './entities/album.entity';

@Controller('albums')
export class AlbumsController {
  constructor(
    private readonly albumsService: AlbumsService,
  ) {
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
    return this.albumsService.findAll(options.take, options.skip, options.title);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.albumsService.findOne(id);
  }
}
