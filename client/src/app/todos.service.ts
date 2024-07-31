import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  todos:Todo[] = [
    {
      title: 'Todo 1',
      description: 'This is the first todo',
      completed: false
    },
    {
      title: 'Todo 2',
      description: 'This is the second todo',
      completed: true
    },
    {
      title: 'Todo 3',
      description: 'This is the third todo',
      completed: false
    }
  ]
  constructor() { }

  getTodos() {
    return this.todos;
  }

  addTodo(todo:Todo) {
    this.todos.push(todo);
  }

  deleteTodo(index:number) {
    this.todos.splice(index, 1);
  }

  updateTodo(index:number, todo:Todo) {
    this.todos[index] = todo;
  }

  getCompletedTodos() {
    return this.todos.filter(todo => todo.completed);
  }

  getUncompletedTodos() {
    return this.todos.filter(todo => !todo.completed);
  }

  getTodoByIndex(index:number) {
    return this.todos[index];
  }

  getTodoIndex(todo:Todo) {
    return this.todos.indexOf(todo);
  }

  toggleCompleted(index:number) {
    this.todos[index].completed = !this.todos[index].completed;
  }

  getCompletedCount() {
    return this.getCompletedTodos().length;
  }

  getUncompletedCount() {
    return this.getUncompletedTodos().length;
  }

  getTotalCount() {
    return this.todos.length;
  }

  clearCompleted() {
    this.todos = this.getUncompletedTodos();
  }

  clearAll() {
    this.todos = [];
  }
}
