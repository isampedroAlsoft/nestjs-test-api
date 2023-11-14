import { Controller, Get, Logger, Query } from '@nestjs/common';
import { AlbumsService } from './albums.service';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {
    Logger.log('AlbumsController initialized');
  }

  @Get()
  findAll(@Query() where: { take: number; skip: number }) {
    Logger.log('AlbumsController:findAll');
    const albums = this.albumsService.findAll(where);
    return albums;
  }
}
