import { Component } from '@angular/core';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [],
  template:`
    <div class="py-8 px-4">
      hello from todo
    </div>
  `,
  styleUrl: './todo.component.css'
})
export class TodoComponent {

}
