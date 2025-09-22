import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../util/jwt.guard';
import { TasksService } from './tasks.service';
import { Task } from '../../entities/task.entity';

// Local DTOs to avoid importing from '@taskforge/data'
type Status = 'todo' | 'doing' | 'done';
export class CreateTaskDto {
  title!: string;
  category?: string;
  status?: Status;
}
export class UpdateTaskDto {
  title?: string;
  category?: string;
  status?: Status;
}

@UseGuards(JwtAuthGuard) // keep only JWT guard for now
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasks: TasksService) {}

  @Get()
  list(@Req() req: any): Promise<Task[]> {
    return this.tasks.list(req.user.orgId);
  }

  @Post()
  create(@Req() req: any, @Body() dto: CreateTaskDto): Promise<Task> {
    return this.tasks.create(req.user.orgId, req.user.sub, dto);
  }

  @Put(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() dto: UpdateTaskDto): Promise<Task> {
    return this.tasks.update(req.user.orgId, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string): Promise<{ ok: boolean }> {
    return this.tasks.remove(req.user.orgId, id);
  }
}