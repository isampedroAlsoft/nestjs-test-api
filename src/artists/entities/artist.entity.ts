import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Artist')
export class Artist {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ArtistId' })
  id: number;

  @Column({ type: 'varchar', name: 'Name', length: 120 })
  name: string;
}
