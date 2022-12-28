import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrganizationUnitsService {

  private ouCodes = new BehaviorSubject<Array<string>>([]);
  private ouCodes$ = this.ouCodes.asObservable();

  constructor() {}

  getOUCodes(): Observable<Array<string>> {
    return this.ouCodes$;
  }

  setOUCodes(latestValue: Array<string>) {
    return this.ouCodes.next(latestValue);
  }

}
