import { Album } from 'src/albums/entities/album.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Artist')
export class Artist {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ArtistId' })
  id: number;

  @Column({ type: 'varchar', name: 'Name', length: 120 })
  name: string;

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];
}
