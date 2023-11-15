import { Album } from 'src/albums/entities/album.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Track')
export class Track {
  @PrimaryGeneratedColumn({ type: 'int', name: 'TrackId' })
  id: number;

  @Column({ type: 'varchar', name: 'Name', length: 160 })
  name: string;

  @ManyToOne(() => Album, (album) => album.tracks)
  album: Album;

  @Column({ type: 'varchar', name: 'Composer' })
  composer: string;

  @Column({ type: 'int', name: 'Milliseconds' })
  milliseconds: number;

  @Column({ type: 'int', name: 'Bytes' })
  bytes: number;

  @Column({ type: 'int', name: 'UnitPrice' })
  unitPrice: number;
}
