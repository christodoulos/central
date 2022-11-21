import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'central-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css'],
})
export class OrganizationsComponent implements OnInit {
  
  rowData: any[]=[
    {make:'Toyota', model:'Celica', price:3500},
    {make:'Ford', model:'Mondeo', price:3500},
    {make:'Fiat', model:'Panda', price:3500}
  ];
  colDefs: ColDef[] = [
    {field:'make'},
    {field:'model'},
    {field:'price'}
  ];
  
  constructor() {}

  ngOnInit(): void {}
}
