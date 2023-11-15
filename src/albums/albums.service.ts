import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { InsertResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album) private albumRepository: Repository<Album>,
  ) {
    Logger.log('Albums Service initialized');
  }

  create(album: Partial<Album>): Promise<InsertResult> {
    return this.albumRepository.insert(album);
  }

  update(id: number, album: Partial<Album>): Promise<UpdateResult> {
    return this.albumRepository.update(id, album);
  }
}
