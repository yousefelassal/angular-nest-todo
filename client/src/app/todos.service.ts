import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { ActivitiesService } from './activities.service';

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
  constructor(private activityService:ActivitiesService) {}

  getTodos() {
    return this.todos;
  }

  addTodo(todo:Todo) {
    this.todos.push(todo);
    this.activityService.addActivity({
      id: this.activityService.activities.length + 1,
      actor: 'John Doe',
      action: 'created',
      target: todo.title,
      date: new Date().toISOString()
    });
  }

  deleteTodo(id:number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.activityService.addActivity({
      id: this.activityService.activities.length + 1,
      actor: 'John Doe',
      action: 'deleted',
      target: `Todo ${id}`,
      date: new Date().toISOString()
    });
  }

  updateTodo(todo:Todo) {
    const index = this.todos.findIndex(t => t.id === todo.id);
    this.todos[index] = todo;
    this.activityService.addActivity({
      id: this.activityService.activities.length + 1,
      actor: 'John Doe',
      action: 'updated',
      target: todo.title,
      date: new Date().toISOString()
    });
  }

  getCompletedTodos() {
    return this.todos.filter(todo => todo.completed);
  }

  getUncompletedTodos() {
    return this.todos.filter(todo => !todo.completed);
  }

  toggleCompleted(id:number) {
    const todo = this.todos.find(todo => todo.id === id);
    if (!todo) return;
    todo.completed = !todo.completed;
    this.activityService.addActivity({
      id: this.activityService.activities.length + 1,
      actor: 'John Doe',
      action: todo.completed ? 'completed' : 'uncompleted',
      target: todo.title,
      date: new Date().toISOString()
    });
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
    this.activityService.addActivity({
      id: this.activityService.activities.length + 1,
      actor: 'John Doe',
      action: 'cleared',
      target: 'cleared completed todos',
      date: new Date().toISOString()
    });
  }

  clearAll() {
    this.todos = [];
    this.activityService.addActivity({
      id: this.activityService.activities.length + 1,
      actor: 'John Doe',
      action: 'cleared',
      target: 'cleared all todos',
      date: new Date().toISOString()
    });
  }
}
