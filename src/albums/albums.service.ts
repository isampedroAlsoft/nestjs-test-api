import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './etities/album.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album) private albumRepository: Repository<Album>,
  ) {
    Logger.log('AlbumsService initialized');
  }

  findAll(options: FindManyOptions<Album>): Promise<Album[]> {
    Logger.log('AlbumsService:findAll');
    return this.albumRepository.find(options);
  }
}
