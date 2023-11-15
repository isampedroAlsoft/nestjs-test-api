import { Artist } from 'src/artists/entities/artist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Album')
export class Album {
  @PrimaryGeneratedColumn({ type: 'int', name: 'AlbumId' })
  id: number;

  @Column({ type: 'varchar', name: 'Title', length: 160 })
  title: string;

  @ManyToOne(() => Artist, (artist) => artist.albums)
  artist: Artist;
}
