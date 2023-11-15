import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track) private tracksRepository: Repository<Track>,
    private datasource: DataSource,
  ) {
    Logger.log('Albums Service initialized');
  }

  create(track: Partial<Track>): Promise<InsertResult> {
    return this.tracksRepository.insert(track);
  }

  update(id: number, track: Partial<Track>): Promise<UpdateResult> {
    return this.tracksRepository.update(id, track);
  }

  findAll(take?: number, skip?: number, name?: string): Promise<Track[]> {
    return this.datasource
      .createQueryBuilder(Track, 'track')
      .andWhere(
        'track.Name LIKE :name',
        !!name ? { name: '%' + name + '%' } : { name: '%' },
      )
      .take(take)
      .skip(skip)
      .innerJoinAndSelect('track.album', 'album')
      .getMany();
  }

  findOne(id: number): Promise<Track> {
    return this.datasource
      .createQueryBuilder(Track, 'album')
      .andWhere('track.TrackID = :id', { id })
      .innerJoinAndSelect('track.album', 'album')
      .getOne();
  }
}
