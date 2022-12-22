import { Component } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-enterprise';
import { Observable } from 'rxjs';
import { Organization } from '@central/interfaces';
import { OrganizationsRepository } from '../state';

@Component({
  selector: 'central-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css'],
})
export class OrganizationsComponent {
  private gridApi!: GridApi<Organization>;

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
            const purpose: string[] = [];
            data.forEach(function(x: { description: string; }){
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

  public overlayLoadingTemplate =
    '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
  
  public overlayNoRowsTemplate =
    '<span style="padding: 10px;">Loading data...</span>'
    
  constructor(
    private repo: OrganizationsRepository,
  ) {}

  onGridReady(params: GridReadyEvent<Organization>) {
    this.gridApi = params.api;

    this.rowData$ = this.repo.organizations$;
    if (!this.rowData$) {
      this.gridApi.hideOverlay();
    }
  }
}
