import { Component, inject } from '@angular/core';
import { TodosService } from '../todos.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [],
  template:`
    <div class="flex flex-col gap-4 py-8 px-4 w-[calc(100vw-280px)]">
      <button (click)="addTodo()">Add Todo</button>
      <div class="flex flex-col gap-4">
        @for (todo of todos; track todo.id) {
          <div class="flex flex-col bg-gray-50 rounded-xl">
            <div class="flex gap-2">
              <label class="flex-1 checkbox-container p-[8px_15px_8px_22px] w-full flex justify-between items-center cursor-pointer">
                <div [class]="['flex flex-1 flex-col', todo.completed ? 'line-through' : '']">
                  <div class="font-bold">{{ todo.title }}</div>
                  <div>{{ todo.description }}</div>
                </div>
                <label class="checkbox">
                  <input id="checkbox" [checked]="todo.completed" (change)="completeTodo(todo.id)" class="hidden" type="checkbox" />
                </label>
              </label>
            </div>
            <div class="flex gap-2 ml-5">
              <button (click)="deleteTodo(todo.id)">Delete</button>
              <button (click)="updateTodo(todo)">Update</button>
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
  isHovering:boolean = false;

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
