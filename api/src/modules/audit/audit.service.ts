import { Injectable } from '@nestjs/common';

export interface AuditEvent {
  ts: string;
  actorId: string;
  orgId: string;
  action: string;
  target?: Record<string, any>;
  details?: Record<string, any>;
}

@Injectable()
export class AuditService {
  private events: AuditEvent[] = [];

  log(e: Omit<AuditEvent, 'ts'>) {
    this.events.push({ ts: new Date().toISOString(), ...e });
    if (this.events.length > 2000) this.events.shift();
  }

  list() {
    return [...this.events].reverse();
  }
}
