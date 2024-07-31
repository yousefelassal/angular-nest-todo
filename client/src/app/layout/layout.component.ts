import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template:`
    <div class="sticky top-0 left-0 flex flex-col gap-1 h-screen w-[200px] py-8 px-4">
      <a
        class="p-2 rounded-md w-full hover:bg-gray-200/80 transition-colors"
        routerLinkActive="bg-gray-200"
        [routerLinkActiveOptions]="{exact: true}"
        routerLink="/"
      >
        Home
      </a>
      <a
        class="p-2 rounded-md w-full hover:bg-gray-200/80 transition-colors"
        routerLinkActive="bg-gray-200"
        [routerLinkActiveOptions]="{exact: true}"
        routerLink="/activity"
      >
        Activity
      </a>
    </div>
  `,
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
