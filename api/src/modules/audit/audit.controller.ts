import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../util/jwt.guard';
import { AuditService } from './audit.service';

@UseGuards(JwtAuthGuard)
@Controller('audit-log')
export class AuditController {
  constructor(private readonly audits: AuditService) {}

  @Get()
  list() {
    return this.audits.list();
  }
}