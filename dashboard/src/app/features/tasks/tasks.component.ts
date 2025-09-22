import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';

// Types used by the template
export type TaskStatus = 'todo' | 'doing' | 'done';
export interface Task {
  id: string | number;
  title: string;
  description?: string;
  status: TaskStatus;
  category?: string | null;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './tasks.component.html',
})
export class TasksComponent implements OnInit {
  // DI via inject() per @angular-eslint/prefer-inject
  private http = inject(HttpClient);

  // Form + filter fields
  title = '';
  category = '';
  q = '';

  // Data
  tasks: Task[] = [];

  ngOnInit(): void {
    this.load();
  }

  // Fetch all tasks
  load() {
    this.http.get<Task[]>('/api/tasks').subscribe((data) => (this.tasks = data ?? []));
  }

  // Create a task (called by (ngSubmit)="add()" in the template)
  add() {
    const title = this.title.trim();
    const category = this.category.trim() || undefined;
    if (!title) return;

    this.http
      .post<Task>('/api/tasks', { title, status: 'todo', category })
      .subscribe(() => {
        this.title = '';
        this.category = '';
        this.load();
      });
  }

  // Return tasks filtered by status and optional search query
  byStatus(status: TaskStatus): Task[] {
    const needle = this.q.trim().toLowerCase();
    return this.tasks
      .filter((t) => t.status === status)
      .filter((t) => (needle ? t.title.toLowerCase().includes(needle) : true));
  }

  // Handle drag-and-drop between columns
  drop(event: CdkDragDrop<Task[]>, newStatus: TaskStatus) {
    const task = event.item.data as Task | undefined;
    if (!task || task.status === newStatus) return;

    this.http.put<Task>(`/api/tasks/${task.id}`, { status: newStatus }).subscribe(() => this.load());
  }

  // Delete a task
  del(id: string | number) {
    this.http.delete<{ ok: boolean }>(`/api/tasks/${id}`).subscribe(() => this.load());
  }
}
