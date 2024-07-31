import { Component, inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ActivitiesService } from '../activities.service';

@Component({
  selector: 'app-cell-button',
  standalone: true,
  imports: [],
  template: `
    <button
      class="w-full bg-red-500 border border-red-600 text-white"
      (click)="buttonClicked()"
    >
      Delete
    </button>`
})
export class CellButtonComponent implements ICellRendererAngularComp {
  activitiesService = inject(ActivitiesService);
  id = {};

  agInit(params: ICellRendererParams): void {
    this.id = params.data.id;
  }
  refresh(params: ICellRendererParams) {
    return true;
  }

  buttonClicked() {
    console.log(this.id)
    this.activitiesService.deleteActivity(+this.id);
  }
}
