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
  
  colDefs: ColDef[] = [
    { headerName:'Κωδικός', field:'code', sortable:true, filter:true, suppressSizeToFit:true, resizable:true },
    { headerName:'Φορέας', field:'preferredLabel', sortable:true, filter:true, suppressSizeToFit:true, resizable:true },
    { headerName:'Εποπτεύοντας φορέας', field:'subOrganizationOf.preferredLabel', sortable:true, filter:true, suppressSizeToFit:true, resizable:true},
    { headerName:'Τύπος φορέα', field:'organizationType.description', sortable:true, filter:true, suppressSizeToFit:true, resizable:true},
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
        }, sortable:true, filter:true, suppressSizeToFit:true, resizable:true },
    { headerName:'Περιγραφή', field:'description', sortable:true, filter:true, suppressSizeToFit:true, resizable:true},
    { headerName:'ΦΕΚ', field:'foundationFek.issue', sortable:true, filter:true, suppressSizeToFit:true, resizable:true},
    { headerName:'Μονάδες', field:'organization_units', sortable:true, filter:true, suppressSizeToFit:true, resizable:true}
  ];
  
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
