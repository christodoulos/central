import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'central-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css'],
})
export class OrganizationsComponent implements OnInit {
  
  // rowData: any[]=[
  //   {make:'Toyota', model:'Celica', price:3500},
  //   {make:'Ford', model:'Mondeo', price:3500},
  //   {make:'Fiat', model:'Panda', price:3500}
  // ];

  public rowData$!: Observable<any[]>; 
  
  colDefs: ColDef[] = [
    { field:'make', sortable:true, filter:true },
    { field:'model', sortable:true, filter:true },
    { field:'price', sortable:true, filter:true}
  ];
  
  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.rowData$ = this.http.get<any[]>('https://www.ag-grid.com/example-assets/row-data.json')
  }
}
