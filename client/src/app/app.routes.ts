import { Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { ActivityComponent } from './activity/activity.component';

export const routes: Routes = [
    {
        path: '',
        title: 'Home',
        component: TodoComponent
    },
    {
        path: 'activity',
        title: 'Activity',
        component: ActivityComponent,

    }
];
