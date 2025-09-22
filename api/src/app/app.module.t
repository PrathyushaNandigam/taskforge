import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { Org } from './entities/org.entity';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { RolePerm } from './entities/role-perm.entity';
import { UserRole } from './entities/user-role.entity';
import { Task } from './entities/task.entity';
import { AuditLog } from './entities/audit-log.entity';

import { AuthModule } from './modules/auth/auth.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { AuditModule } from './modules/audit/audit.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => {
        const type = cfg.get<string>('DB_TYPE');
        const isSqlite = type === 'sqlite';
        return isSqlite
          ? {
              type: 'sqlite',
              database: cfg.get<string>('DB_PATH') ?? './db.sqlite',
              entities: [User, Org, Role, Permission, RolePerm, UserRole, Task, AuditLog],
              synchronize: true, // dev only
            }
          : {
              type: 'postgres',
              host: cfg.get('DB_HOST'),
              port: parseInt(cfg.get('DB_PORT') ?? '5432', 10),
              username: cfg.get('DB_USER'),
              password: cfg.get('DB_PASS'),
              database: cfg.get('DB_NAME'),
              entities: [User, Org, Role, Permission, RolePerm, UserRole, Task, AuditLog],
              synchronize: true, // dev only
            };
      },
    }),
    AuthModule,
    TasksModule,
    AuditModule,
  ],
})
export class AppModule {}
