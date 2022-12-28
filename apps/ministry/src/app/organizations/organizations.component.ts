import { Component } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent, SelectionChangedEvent, IsRowSelectable, RowNode, FirstDataRenderedEvent } from 'ag-grid-community';
import 'ag-grid-enterprise';
import { Observable } from 'rxjs';
import { Organization } from '@central/interfaces';
import { OrganizationsRepository } from '../state';
import { OrganizationsService } from './organizations.service';

@Component({
  selector: 'central-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css'],
})
export class OrganizationsComponent {
  private gridApi!: GridApi<Organization>;

  public rowData$!: Observable<Organization[]>;
  
  public columnDefs: ColDef[] = [
    { headerName:'Κωδικός', field:'code', checkboxSelection: true },
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
    '<span style="padding: 10px;">Loading data...</span>';
  
  constructor(
    private repo: OrganizationsRepository,
    private oService: OrganizationsService,
  ) {}
  
  onGridReady(params: GridReadyEvent<Organization>) {
    this.gridApi = params.api;

    this.rowData$ = this.repo.organizations$;
    if (!this.rowData$) {
      this.gridApi.hideOverlay();
    }
  }

  getSelectedRowData() {
    const selectedData = this.gridApi.getSelectedRows();
    console.log(`Selected Data:\n${JSON.stringify(selectedData)}`);
    return selectedData;
  }

  onSelectionChanged(event: SelectionChangedEvent) {
    const selectedData = this.gridApi.getSelectedRows();
    this.oService.setOUCodes(selectedData.map(x => x.code));
  }

  isRowSelectable: IsRowSelectable = (rowNode: RowNode) => {
    return rowNode.data ? rowNode.data.organization_units >=1 : true;
  };

  onFirstDataRendered(params: FirstDataRenderedEvent<Organization>) {
    this.oService.getOUCode()
      .subscribe(data=>{
        params.api.forEachNode((node) =>
          node.setSelected(!!node.data && data.includes(node.data.code))
        );
      });
  }
  
}
