import { Injectable } from '@angular/core';
import { Activity } from './activity';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  activities:Activity[] = [
    {
      id: 1,
      actor: 'John Doe',
      action: 'created',
      target: 'Todo 1',
      date: new Date().toISOString()
    },
    {
      id: 2,
      actor: 'Jane Doe',
      action: 'completed',
      target: 'Todo 2',
      date: new Date().toISOString()
    },
    {
      id: 3,
      actor: 'John Doe',
      action: 'deleted',
      target: 'Todo 3',
      date: new Date().toISOString()
    }
  ]
  constructor() { }

  getActivities() {
    return this.activities;
  }

  addActivity(activity:Activity) {
    this.activities.push(activity);
  }

  deleteActivity(id:number) {
    this.activities = this.activities.filter(activity => activity.id !== id);
  }
}
