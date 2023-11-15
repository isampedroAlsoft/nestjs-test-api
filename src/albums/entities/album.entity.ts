import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Album')
export class Album {
  @PrimaryGeneratedColumn({ type: 'int', name: 'AlbumId' })
  id: number;

  @Column({ type: 'varchar', name: 'Title', length: 160 })
  title: string;

  @ManyToOne(() => Artist, (artist) => artist.albums)
  artist: Artist;

  @OneToMany(() => Track, (track) => track.album)
  tracks: Track[];
}
