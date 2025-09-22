import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm';
import { Role } from './role.entity';
import { Permission } from './permission.entity';

@Entity()
@Unique(['role', 'permission'])
export class RolePermission {
  @PrimaryGeneratedColumn('uuid') id!: string;

  @ManyToOne(() => Role, (r) => r.perms, { eager: true })
  role!: Role;

  @ManyToOne(() => Permission, { eager: true })
  permission!: Permission;
}
