import { Component, inject, model, signal } from '@angular/core';
import { TodosService } from '../todos.service';
import { Todo } from '../todo';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

export interface DialogData {
  title: string;
  description: string;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  template:`
    <div class="flex flex-col gap-4 py-8 px-4 w-[calc(100vw-280px)]">
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
            <div class="flex items-center gap-2 ml-5">
              <button (click)="deleteTodo(todo.id)"><span class="material-symbols-outlined">delete</span></button>
              <button (click)="updateTodo(todo)"><span class="material-symbols-outlined">edit</span></button>
            </div>
          </div>
        } @empty {
          <div>No todos found</div>
        }
      </div>
    </div>
    <button mat-raised-button (click)="addTodo()">Add Todo</button>

  `,
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  readonly title = signal('');
  readonly description = signal('');
  readonly dialog = inject(MatDialog);

  todoService = inject(TodosService);
  todos:Todo[] = []
  isHovering:boolean = false;

  constructor() {
    this.todos = this.todoService.getTodos();
  }

  addTodo() {
    const dialogRef = this.dialog.open(Dialog, {
      data: { title: this.title() }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.todoService.addTodo({
          id: new Date().getTime(),
          title: result,
          description: '',
          completed: false
        });
        this.todos = this.todoService.getTodos();
      }
    });
  }

  deleteTodo(id:number) {
    this.todoService.deleteTodo(id);
    this.todos = this.todoService.getTodos();
  }

  updateTodo(todo:Todo) {
    const dialogRef = this.dialog.open(Dialog, {
      data: { title: todo.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.todoService.updateTodo({
          id: todo.id,
          title: result,
          description: todo.description,
          completed: todo.completed
        });
        this.todos = this.todoService.getTodos();
      }
    });
  }

  completeTodo(id:number) {
    this.todoService.toggleCompleted(id);
  }
}

@Component({
  selector: 'dialog',
  templateUrl: './dialog.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class Dialog {
  readonly dialogRef = inject(MatDialogRef<Dialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly title = model(this.data.title);

  onNoClick(): void {
    this.dialogRef.close();
  }
}