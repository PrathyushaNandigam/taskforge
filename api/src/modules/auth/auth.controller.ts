import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { AuthService } from './auth.service';
import { User } from '../../entities/user.entity';
import { Organization } from '../../entities/org.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Organization) private readonly orgs: Repository<Organization>,
  ) {}

  @Post('login')
  async login(@Body() dto: { email: string; password: string }) {
    return this.auth.login(dto.email, dto.password);
  }

  // DEV-ONLY: create a default org + user to unblock login
  @Post('dev-create-user')
  async devCreateUser(
    @Body() body: { email?: string; password?: string; name?: string }
  ) {
    const email = body?.email ?? 'admin@demo.dev';
    const password = body?.password ?? 'Admin123!';
    const name = body?.name ?? 'Admin';

    let org = await this.orgs.findOne({ where: { name: 'Default' } });
    if (!org) {
      org = this.orgs.create({ name: 'Default' });
      org = await this.orgs.save(org);
    }

    let user = await this.users.findOne({ where: { email } });
    if (!user) {
      user = this.users.create({
        email,
        name,
        password: await bcrypt.hash(password, 10),
        organization: org,
      });
      user = await this.users.save(user);
    }

    return { ok: true, email, password, orgId: org.id, userId: user.id };
  }
}
