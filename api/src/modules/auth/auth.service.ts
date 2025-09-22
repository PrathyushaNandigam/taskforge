import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwt: JwtService,
  ) {}

  async login(email: string, password: string) {
    // only load relations that actually exist on User
    const user = await this.users.findOne({
      where: { email },
      relations: ['organization'], // no 'roles' here
    });

    if (!user) throw new UnauthorizedException();

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new UnauthorizedException();

    const payload = { sub: user.id, orgId: user.organization?.id };
    const access_token = await this.jwt.signAsync(payload);

    return {
      access_token,
      user: { id: user.id, email: user.email, orgId: user.organization?.id },
    };
  }
}
