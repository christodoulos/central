import { Controller, Get, Param } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly service: OrganizationsService){}

  @Get('all')
  async all(){
    console.log("Organizations all");
    return await this.service.get_all();
  }

  @Get(':id')
  async by_id(@Param() params: { id: string }) {
    console.log("Organizations by id");
    const id = params.id;
    return await this.service.get_by_id(id);
  }
}
