import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Organization } from './org.entity';
import { User } from './user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid') id!: string;

  @Column() title!: string;

  @Column({ type: 'text', default: 'todo' })
  status!: 'todo' | 'doing' | 'done';

  @Column({ type: 'text', nullable: true })
  category?: string;

  @ManyToOne(() => Organization, { eager: true })
  organization!: Organization;

  @ManyToOne(() => User, { eager: true })
  owner!: User;

  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}
