import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
@Entity()
export class AuditLog {
  @PrimaryGeneratedColumn() id!: number;
  @Column() actorId!: number;
  @Column() action!: string; // e.g. "task.create"
  @Column({ nullable: true }) resourceId?: string; // task id etc.
  @Column('text', { nullable: true }) details?: string;
  @CreateDateColumn() at!: Date;
}
