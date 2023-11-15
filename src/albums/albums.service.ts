import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { DataSource, InsertResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album) private albumRepository: Repository<Album>,
    private datasource: DataSource,
  ) {
    Logger.log('Albums Service initialized');
  }

  create(album: Partial<Album>): Promise<InsertResult> {
    return this.albumRepository.insert(album);
  }

  update(id: number, album: Partial<Album>): Promise<UpdateResult> {
    return this.albumRepository.update(id, album);
  }

  findAll(take?: number, skip?: number, title?: string): Promise<Album[]> {
    return this.datasource
      .createQueryBuilder(Album, 'album')
      .andWhere(
        'album.Title LIKE :title',
        !!title ? { title: '%' + title + '%' } : { title: '%' },
      )
      .take(take)
      .skip(skip)
      .innerJoinAndSelect('album.artist', 'artist')
      .getMany();
  }

  findOne(id: number): Promise<Album> {
    return this.datasource
      .createQueryBuilder(Album, 'album')
      .andWhere('album.AlbumId = :id', { id })
      .innerJoinAndSelect('album.artist', 'artist')
      .getOne();
  }
}
