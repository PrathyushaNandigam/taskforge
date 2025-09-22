import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
@Entity()
@Unique(['key'])
export class Permission {
  @PrimaryGeneratedColumn() id!: number;
  @Column() key!: string; // 'task.create' | 'task.read' | 'task.update' | 'task.delete' | 'audit.read'
}
