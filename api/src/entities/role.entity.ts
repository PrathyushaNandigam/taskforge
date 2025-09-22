import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Organization } from './org.entity';
import { RolePermission } from './role-perm.entity';
// Remove UserRole if you don't actually have that entity
// import { UserRole } from './user-role.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column() name!: 'Owner' | 'Admin' | 'Viewer';

  @ManyToOne(() => Organization, { eager: true })
  org!: Organization;

  @OneToMany(() => RolePermission, (rp) => rp.role)
  perms!: RolePermission[];

  // If you don't use UserRole, remove this relation
  // @OneToMany(() => UserRole, (ur) => ur.role)
  // users!: UserRole[];
}
