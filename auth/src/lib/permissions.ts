import { SetMetadata, Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

// Decorators
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
export const Permissions = (...perms: string[]) => SetMetadata('perms', perms);

// Very basic example guards (tighten logic later)
@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    // allow if user has any role; replace with real metadata check as needed
    return !!user?.role;
  }
}

@Injectable()
export class PermissionsGuard implements CanActivate {
  canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    // allow if user has any permissions; replace with real metadata check
    return Array.isArray(user?.permissions);
  }
}
