import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-enterprise';
import { Observable } from 'rxjs';
import { OrganizationUnits } from '@central/interfaces';
import { OrganizationUnitsRepository } from '../state';
import { OrganizationUnitsService } from './organization-units.service';

@Component({
  selector: 'central-organization-units',
  templateUrl: './organization-units.component.html',
  styleUrls: ['./organization-units.component.css']
})
export class OrganizationUnitsComponent implements OnInit {
  private gridApi!: GridApi<OrganizationUnits>;

  public rowData$!: Observable<OrganizationUnits[]>;
  
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
      } 
    }
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
    private repo: OrganizationUnitsRepository,
    private ouService: OrganizationUnitsService,
  ) {}

  ngOnInit() {
    this.ouService
      .getOUCodes()
      .subscribe((data) => {
        console.log("Subscription got", data);
        this.repo.setOrganizationUnitsByCode(data);
      });
  }

  onGridReady(params: GridReadyEvent<OrganizationUnits>) {
    this.gridApi = params.api;
    console.log("OUAAAAAAA");
    
    this.rowData$ = this.repo.organizations_units$;
    if (!this.rowData$) {
      this.gridApi.hideOverlay();
    }
  }

}
