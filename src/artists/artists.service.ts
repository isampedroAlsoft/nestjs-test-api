import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import {
  FindManyOptions,
  FindOneOptions,
  InsertResult,
  Repository,
  UpdateResult,
} from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist) private artistRepository: Repository<Artist>,
  ) {
    Logger.log('Albums Service initialized');
  }

  create(artist: Partial<Artist>): Promise<InsertResult> {
    return this.artistRepository.insert(artist);
  }

  update(id: number, artist: Partial<Artist>): Promise<UpdateResult> {
    return this.artistRepository.update(id, artist);
  }

  findAll(options: FindManyOptions<Artist>): Promise<Artist[]> {
    Logger.log(options);
    return this.artistRepository.find(options);
  }

  findOne(params: FindOneOptions): Promise<Artist> {
    return this.artistRepository.findOne(params);
  }
}
