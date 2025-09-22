import { CanActivate, ExecutionContext, Injectable, ForbiddenException, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REQUIRE_PERMS_KEY } from './require-perms.decorator';
import { Request } from 'express';
import { DataSource } from 'typeorm';

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(private refl: Reflector, @Inject(DataSource) private ds: DataSource) {}
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest<Request>();
    const required = this.refl.getAllAndOverride<string[]>(REQUIRE_PERMS_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]) || [];

    // no specific perms required
    if (!required.length) return true;

    const user = (req as any).user as { userId: number; orgId: number };
    if (!user) throw new ForbiddenException('Not authenticated');

    // Load user roles and permissions quickly (simple join query)
    const rows = await this.ds.query(
      `
      select p.key as perm, r.name as role, o.id as orgId
      from user_role ur
      join role r on r.id = ur.role_id
      join role_perm rp on rp.role_id = r.id
      join permission p on p.id = rp.perm_id
      join org o on o.id = r.org_id
      where ur.user_id = $1
      `,
      [user.userId]
    );

    const has = (perm: string) => rows.some((row: any) => row.perm === perm);

    // basic role inheritance: Owner ⊃ Admin ⊃ Viewer
    // we assume perms table already contains keys; rows reflect assignments

    for (const needed of required) {
      if (!has(needed)) throw new ForbiddenException(⁠ Missing permission: ${needed} ⁠);
    }
    return true;
  }
}
