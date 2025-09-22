export type TaskStatus = 'todo' | 'doing' | 'done';

export interface CreateTaskDto {
  title: string;
  category?: string;
  status?: TaskStatus;
}

export interface UpdateTaskDto extends Partial<CreateTaskDto> {}
