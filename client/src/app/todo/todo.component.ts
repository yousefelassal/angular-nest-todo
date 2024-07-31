import { Component, inject } from '@angular/core';
import { TodosService } from '../todos.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [],
  template:`
    <div class="flex flex-col gap-4 py-8 px-4">
      <button class="btn" (click)="addTodo()">Add Todo</button>
      <div class="flex flex-col gap-4">
        @for (todo of todos; track todo.id) {
          <div class="flex flex-col gap-2">
            <div class="flex gap-2">
              <input type="checkbox" [checked]="todo.completed" (change)="completeTodo(todo.id)">
              <div class="flex flex-col">
                <div class="font-bold">{{ todo.title }}</div>
                <div>{{ todo.description }}</div>
              </div>
            </div>
            <div class="flex gap-2">
              <button class="btn" (click)="deleteTodo(todo.id)">Delete</button>
              <button class="btn" (click)="updateTodo(todo)">Update</button>
            </div>
          </div>
        } @empty {
          <div>No todos found</div>
        }
      </div>
    </div>
  `,
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  todoService = inject(TodosService);
  todos:Todo[] = []

  constructor() {
    this.todos = this.todoService.getTodos();
  }

  addTodo() {
    this.todoService.addTodo({
      id: this.todos.length + 1,
      title: `Todo ${this.todos.length + 1}`,
      description: `This is todo ${this.todos.length + 1}`,
      completed: false
    });
  }

  deleteTodo(id:number) {
    this.todoService.deleteTodo(id);
    this.todos = this.todoService.getTodos();
  }

  updateTodo(todo:Todo) {
    this.todoService.updateTodo(todo);
  }

  completeTodo(id:number) {
    this.todoService.toggleCompleted(id);
  }
}
