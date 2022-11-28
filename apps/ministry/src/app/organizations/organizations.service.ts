import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
// import { trackRequestResult, setRequestStatus } from '@ngneat/elf-requests';
import { Organization } from '@central/interfaces';
import { OrganizationsRepository } from '../state';

const AUTH_API = '/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class OrganizationsService {
  
  constructor(
    private http: HttpClient,
    private repo: OrganizationsRepository
  ) { }

  getOrganizations(){
    return this.http
      .get<Organization[]>(`${AUTH_API}organizations/all`, httpOptions)
      .pipe(
        tap((organizations)=> { 
          this.repo.setOrganizations(organizations);
        }),
        this.repo.trackOrganizationsRequestsStatus('organizations')
      )
  }

}