import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { tap } from 'rxjs/operators';
import { Organization } from '@central/interfaces';
// import { OrganizationsRepository } from './state';

const AUTH_API = '/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(
    private http: HttpClient,
    // private repoOrganization: OrganizationsRepository
  ) { }

  getOrganizations(){
    console.log("backend service is here >>>");
    return this.http
      .get<Organization[]>(`${AUTH_API}organizations/all`, httpOptions)
      // .pipe(
        // tap((organizations)=> { 
        //   console.log("xxxxxx");
        //   this.repoOrganization.setOrganizations(organizations);
        // }),
        // this.repoOrganization.trackOrganizationsRequestsStatus('organizations')
      // )
  }
}
