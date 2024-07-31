import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

interface CustomButtonParams extends ICellRendererParams {
  delete: (id: number) => void;
}

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
  id: number = 0;
  delete: (id: number) => void = () => {};

  agInit(params: CustomButtonParams): void {
    this.id = params.data.id;
    this.delete = params.delete;
  }
  refresh(params: ICellRendererParams) {
    return true;
  }

  buttonClicked() {
    this.delete(this.id);
  }
}
