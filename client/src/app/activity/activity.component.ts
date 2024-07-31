import { Component, inject, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { Activity } from '../activity';
import { ActivitiesService } from '../activities.service';
import { CellButtonComponent } from '../cell-button/cell-button.component';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [AgGridAngular],
  template:`
    <div class="w-[calc(100vw-280px)] h-full flex flex-1 flex-col gap-4 p-4">
      @defer() {
        <ag-grid-angular
          class="ag-theme-quartz flex-1"
          style="height: 100%; width: 100%;"
          [rowData]="rowData"
          [columnDefs]="colDefs"
          [defaultColDef]="defaultColDef"
          [pagination]="true"
          [paginationPageSize]="20"
        />
      } @placeholder {
        <div>Loading...</div>
      } @loading {
        <div>Loading...</div>
      }
    </div>
  `
})
export class ActivityComponent {
  activitiesService = inject(ActivitiesService);
  
  rowData:Activity[] = [];
 
  colDefs: ColDef[] = [
    { field: "id", flex: 0.5 },
    { field: "actor", filter: true, floatingFilter: true },
    { field: "action", filter: true, floatingFilter: true },
    { field: "target", filter: true, floatingFilter: true },
    { field: "date", valueFormatter: (params) => new Date(params.value).toLocaleDateString() },
    { field: "delete", cellRenderer: CellButtonComponent, flex: 0.5, cellRendererParams: { delete: this.deleteActivity.bind(this) } }
  ];

  defaultColDef: ColDef = {
    flex: 1,
  }

  constructor() {
    this.rowData = this.activitiesService.getActivities();
  }

  deleteActivity(id:number) {
    this.activitiesService.deleteActivity(id)
    this.rowData = this.activitiesService.getActivities();
  }
}
