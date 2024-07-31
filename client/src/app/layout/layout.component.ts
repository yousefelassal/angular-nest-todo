import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template:`
    <div class="sticky top-0 left-0 flex flex-col gap-1 h-screen w-[200px] py-8 px-4">
      <a
        class="flex gap-2 items-center p-2 rounded-md w-full text-gray-700 hover:bg-gray-200/80 transition-all"
        routerLinkActive="bg-gray-200"
        [routerLinkActiveOptions]="{exact: true}"
        routerLink="/"
      >
      <span class="material-symbols-outlined">home</span>
        Home
      </a>
      <a
        class="flex gap-2 items-center p-2 rounded-md w-full text-gray-700 hover:bg-gray-200/80 transition-all"
        routerLinkActive="bg-gray-200"
        [routerLinkActiveOptions]="{exact: true}"
        routerLink="/activity"
      >
      <span class="material-symbols-outlined">history</span>
        Activity
      </a>
    </div>
  `
})
export class LayoutComponent {

}
