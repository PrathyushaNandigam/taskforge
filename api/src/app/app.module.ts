import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../entities/user.entity';
import { Task } from '../entities/task.entity';
import { Organization } from '../entities/org.entity';
import { Permission } from '../entities/permission.entity';
import { Role } from '../entities/role.entity';
import { RolePermission } from '../entities/role-perm.entity';
import { AuditLog } from '../entities/audit-log.entity';

import { AuthModule } from '../modules/auth/auth.module';
import { TasksModule } from '../modules/tasks/tasks.module';
import { AuditModule } from '../modules/audit/audit.module';

@Module({
  imports: [
    // load .env from api/src/.env
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/.env',
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: 'sqlite',
        database: cfg.get<string>('SQLITE_PATH') ?? './data/dev.sqlite',
        entities: [User, Task, Organization, Permission, Role, RolePermission, AuditLog],
        synchronize: true,          // DEV ONLY
        logging: false,
      }),
    }),

    TypeOrmModule.forFeature([User, Task, Organization, Permission, Role, RolePermission, AuditLog]),

    AuthModule,
    TasksModule,
    AuditModule,
  ],
})
export class AppModule {}