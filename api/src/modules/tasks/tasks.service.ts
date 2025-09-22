import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../entities/task.entity';
import { User } from '../../entities/user.entity';

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

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly tasks: Repository<Task>,
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  list(orgId: string) {
    return this.tasks.find({ where: { organization: { id: orgId } } });
  }

  async create(orgId: string, ownerId: string, dto: CreateTaskDto) {
    const task = this.tasks.create({
      title: dto.title,
      category: dto.category,
      status: dto.status ?? 'todo',
      organization: { id: orgId } as any,
      owner: { id: ownerId } as any,
    });
    return this.tasks.save(task);
  }

  async update(orgId: string, id: string, dto: UpdateTaskDto) {
    await this.tasks.update({ id, organization: { id: orgId } as any }, dto);
    return this.tasks.findOneOrFail({ where: { id } });
  }

  async remove(orgId: string, id: string) {
    await this.tasks.delete({ id, organization: { id: orgId } as any });
    return { ok: true };
  }
}