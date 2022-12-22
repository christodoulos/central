import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import {
  setEntities,
  selectAllEntities ,
  withEntities,
} from '@ngneat/elf-entities';
import {
  createRequestsStatusOperator,
  selectRequestStatus,
  updateRequestStatus,
  withRequestsStatus,
} from '@ngneat/elf-requests';
import { OrganizationUnits } from '@central/interfaces';
import { BackendService } from '../backend.service'; 

const store = createStore(
  { name: 'organization-units' },
  withEntities<OrganizationUnits>(),
  withRequestsStatus<'organization-units'>()
);

@Injectable({ providedIn: 'root' })
export class OrganizationUnitsRepository {
  
  constructor(private backendService: BackendService) {}

  organizations_units$ = store.pipe(
    selectAllEntities(),
  );

  trackOrganizationUnitsRequestsStatus = createRequestsStatusOperator(store);
  
  status$ = store.pipe(
    selectRequestStatus('organization-units'))
    .subscribe((status) => {
      console.log(status);
  });

  // setOrganizations(organizations: Organization[]) {
  setOrganizationUnits() {
    this.backendService.getOrganizationUnits().pipe(
      this.trackOrganizationUnitsRequestsStatus('organization-units')
    )
    .subscribe((values) => {
      store.update(
        setEntities(values),
        updateRequestStatus('organization-units', 'success')
      )
    });
  }
}