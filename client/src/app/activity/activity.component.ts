import { Component, inject, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { Activity } from '../activity';
import { ActivitiesService } from '../activities.service';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [AgGridAngular],
  template:`
    <div class="w-[calc(100vw-280px)] h-full flex flex-1 flex-col gap-4 p-4">
      <ag-grid-angular
        class="ag-theme-quartz flex-1"
        style="height: 100%; width: 100%;"
        [rowData]="rowData"
        [columnDefs]="colDefs"
        [defaultColDef]="defaultColDef"
      />
    </div>
  `,
  styleUrl: './activity.component.css'
})
export class ActivityComponent {
  activitiesService = inject(ActivitiesService);
  
  rowData:Activity[] = [];
 
  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: "id" },
    { field: "actor" },
    { field: "action" },
    { field: "target" },
    { field: "date" }
  ];

  defaultColDef: ColDef = {
    flex: 1,
  }

  constructor() {
    this.rowData = this.activitiesService.getActivities();
  }
}
