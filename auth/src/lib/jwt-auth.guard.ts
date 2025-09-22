import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Thin wrapper so controllers can `@UseGuards(JwtAuthGuard)`.
 * Requires your JwtStrategy to be registered in the API AuthModule.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
