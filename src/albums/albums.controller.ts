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
import { DataSource } from 'typeorm';

@Controller('albums')
export class AlbumsController {
  constructor(
    private readonly albumsService: AlbumsService,
    private readonly datasource: DataSource,
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
    const albumsWithArtist = this.datasource
      .createQueryBuilder(Album, 'album')
      .andWhere('album.Title LIKE :title', {
        title: '%' + options.title ? options.title + '%' : '',
      })
      .take(options.take)
      .skip(options.skip)
      .innerJoinAndSelect('album.artist', 'artist');
    return albumsWithArtist.getMany();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.datasource
      .createQueryBuilder(Album, 'album')
      .andWhere('album.AlbumId = :id', { id })
      .innerJoinAndSelect('album.artist', 'artist')
      .getOne();
  }
}
