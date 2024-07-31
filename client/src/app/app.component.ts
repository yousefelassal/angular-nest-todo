import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from "./layout/layout.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  template: `
    <div class="flex min-h-screen relative">
      <app-layout />
      <router-outlet />
    </div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
}
