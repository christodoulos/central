import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Organization, OrganizationUnits } from '@central/interfaces';

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
  ) { }

  getOrganizations(){
    console.log("Get Organizations");
    return this.http
      .get<Organization[]>(`${AUTH_API}organizations/all`, httpOptions)
  }

  getOrganizationUnits(){
    console.log("Get Organizations Units");
    return this.http
      .get<OrganizationUnits[]>(`${AUTH_API}organization-units/all`, httpOptions)
  }

  getOrganizationUnitsByCode(codes: Array<string>){
    console.log("Get Organizations Units By Code");
    const code = codes.join('-');
    return this.http
      .get<OrganizationUnits[]>(`${AUTH_API}organization-units/${code}`, httpOptions)
  }
}
