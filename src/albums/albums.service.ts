import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './etities/album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album) private albumRepository: Repository<Album>,
  ) {
    Logger.log('AlbumsService initialized');
  }

  findAll(where: { take: number; skip: number }): Promise<Album[]> {
    Logger.log('AlbumsService:findAll');
    return this.albumRepository.find(where);
  }
}
