import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Organization } from './org.entity';
import { Task } from './task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid') id!: string;

  @Column() email!: string;     // add if you need it for login
  @Column() name!: string;
  @Column() password!: string;  // hashed

  @ManyToOne(() => Organization, (o) => o.users, { eager: true })
  organization!: Organization;

  @OneToMany(() => Task, (t) => t.owner)
  tasks!: Task[];

  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}
