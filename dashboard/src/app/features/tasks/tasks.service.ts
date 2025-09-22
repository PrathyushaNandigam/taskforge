import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type Task = { id: string; title: string; category?: string; status: 'todo'|'doing'|'done' };

@Injectable({ providedIn: 'root' })
export class TasksClient {
  private http = inject(HttpClient);

  list() { return this.http.get<Task[]>('/api/tasks'); }
  create(dto: Partial<Task>) { return this.http.post<Task>('/api/tasks', dto); }
  update(id: string, dto: Partial<Task>) { return this.http.put<Task>(`/api/tasks/${id}`, dto); }
  remove(id: string) { return this.http.delete<{deleted: boolean}>(`/api/tasks/${id}`); }
}
