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
import { Organization } from '@central/interfaces';

const store = createStore(
  { name: 'organizations' },
  withEntities<Organization>(),
  withRequestsStatus<'organizations'>()
);

@Injectable({ providedIn: 'root' })
export class OrganizationsRepository {
  
  organizations$ = store.pipe(
    selectAllEntities(),
  )
      
  trackOrganizationsRequestsStatus = createRequestsStatusOperator(store);
  
  status$ = store.pipe(
    selectRequestStatus('organizations'))
    .subscribe((status) => {
      console.log(status);
  });

  setOrganizations(organizations: Organization[]) {
    store.update(
      setEntities(organizations),
      updateRequestStatus('organizations', 'success')
    );
  }
}