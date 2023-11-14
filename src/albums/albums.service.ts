import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './etities/album.entity';
import {
  FindManyOptions,
  FindOneOptions,
  InsertResult,
  Repository,
  UpdateResult,
} from 'typeorm';

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

  findAll(options: FindManyOptions<Album>): Promise<Album[]> {
    return this.albumRepository.find(options);
  }

  findOne(params: FindOneOptions): Promise<Album> {
    return this.albumRepository.findOne(params);
  }
}
