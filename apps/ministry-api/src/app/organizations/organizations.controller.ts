import { Controller, Get  } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly service: OrganizationsService){}

  @Get()
  async all(){
    return await this.service.get_all();
  }
}
