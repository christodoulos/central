import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { Organization } from '@central/interfaces';
import { OrganizationsService } from './organizations.service';
import { OrganizationsRepository } from '../state';

@Component({
  selector: 'central-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css'],
})
export class OrganizationsComponent implements OnInit {

  public rowData$!: Observable<Organization[]>; 
  
  public colDefs: ColDef[] = [
    { headerName:'Κωδικός', field:'code' },
    { headerName:'Φορέας', field:'preferredLabel' },
    { headerName:'Εποπτεύοντας φορέας', field:'subOrganizationOf.preferredLabel' },
    { headerName:'Τύπος φορέα', field:'organizationType.description' },
    { headerName:'Λειτουργία', field:'purpose',  
        valueGetter: params => {
          if (params.data.purpose) {
            const data = params.data.purpose; 
            const purpose: any[] = [];
            data.forEach(function(x: { description: any; }){
              purpose.push(x.description);
            });
             return purpose.join(',');
          } else {
            return undefined;
          } 
        } },
    { headerName:'Περιγραφή', field:'description' },
    { headerName:'ΦΕΚ', field:'foundationFek.issue' },
    { headerName:'Μονάδες', field:'organization_units' }
  ];
  
  public defaultColDef: ColDef = {
    sortable:true, 
    filter:'agTextColumnFilter', 
    suppressSizeToFit:true, 
    resizable:true,
    floatingFilter: true,
  };

  constructor(
    private service: OrganizationsService,
    private repo: OrganizationsRepository
  ) {}

  ngOnInit(): void {
    // this.rowData$ = this.http.get<any[]>('https://www.ag-grid.com/example-assets/row-data.json')
    this.service.getOrganizations().subscribe();
    this.rowData$ = this.repo.organizations$;
  }
}
