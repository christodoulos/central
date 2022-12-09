import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Organization } from '@central/interfaces';

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
    console.log("backend service is here >>>");
    return this.http
      .get<Organization[]>(`${AUTH_API}organizations/all`, httpOptions)
  }
}
