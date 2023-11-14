import { Controller, Get, Logger, Query } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { Like } from 'typeorm/find-options/operator/Like';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {
    Logger.log('AlbumsController initialized');
  }

  @Get()
  findAll(
    @Query()
    options: {
      take?: number;
      skip?: number;
      id?: number;
      title?: string;
    },
  ) {
    Logger.log('AlbumsController:findAll');
    const albums = this.albumsService.findAll({
      take: options.take,
      skip: options.skip,
      where: [{ id: options.id }, { title: Like('%' + options.title + '%') }],
    });
    return albums;
  }
}
