import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Album')
export class Album {
  @PrimaryGeneratedColumn({ type: 'int', name: 'AlbumId' })
  id: number;

  @Column({ type: 'varchar', name: 'Title', length: 160 })
  title: string;

  @Column({ type: 'int', name: 'ArtistId' })
  artistId: number;
}
