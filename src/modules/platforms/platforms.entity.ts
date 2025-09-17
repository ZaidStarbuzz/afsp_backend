// src/platforms/platforms.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('platforms')
export class Platforms {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ name: 'short_name', unique: true })
  shortName: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}
