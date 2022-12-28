import { Injectable } from '@angular/core';
import { OrganizationUnitsService } from "../organization-units/organization-units.service";

@Injectable({ providedIn: 'root' })
export class OrganizationsService {
  
  constructor(
    private ouService: OrganizationUnitsService,
  ) {}

  setOUCodes(codes: string[]){
    this.ouService.setOUCodes(codes);
  }

  getOUCode(){
    return this.ouService.getOUCodes()
  }
}