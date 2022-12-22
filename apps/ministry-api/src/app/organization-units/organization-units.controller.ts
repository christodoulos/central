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

  @Get(':id')
  async by_id(@Param() params: { id: string }) {
    console.log("Organization Units by id");
    const id = params.id;
    return await this.service.get_by_id(id);
  }
}
