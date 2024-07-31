import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  todos:Todo[] = [
    {
      id: 1,
      title: 'Todo 1',
      description: 'This is the first todo',
      completed: false
    },
    {
      id: 2,
      title: 'Todo 2',
      description: 'This is the second todo',
      completed: true
    },
    {
      id: 3,
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

  deleteTodo(id:number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  updateTodo(todo:Todo) {
    const index = this.todos.findIndex(t => t.id === todo.id);
    this.todos[index] = todo;
  }

  getCompletedTodos() {
    return this.todos.filter(todo => todo.completed);
  }

  getUncompletedTodos() {
    return this.todos.filter(todo => !todo.completed);
  }

  toggleCompleted(id:number) {
    const index = this.todos.findIndex(todo => todo.id === id);
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
