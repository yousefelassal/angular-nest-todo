import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

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
  agInit(params: ICellRendererParams): void {}
  refresh(params: ICellRendererParams) {
    return true;
  }
  buttonClicked() {
    alert("clicked");
  }
}
