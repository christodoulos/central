import { Controller, Get, Param } from '@nestjs/common';
import { OrganizationUnitsService } from './organization-units.service';

@Controller('organization-units')
export class OrganizationUnitsController {
  constructor(private readonly service: OrganizationUnitsService){}

  @Get('all')
  async all(){
    console.log("Organization Units all");
    return await this.service.get_all();
  }

  @Get(':code')
  async by_code(@Param() params: { code: string }) {
    console.log("Organization Units by Code");
    const codes = params.code.split('-');
    return await this.service.get_by_code(codes);
  }
}
