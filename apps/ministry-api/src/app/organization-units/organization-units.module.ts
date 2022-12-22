import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrganizationUnitsController } from './organization-units.controller';
import { OrganizationUnitsService } from './organization-units.service';
import { OrganizationUnitsSchema } from './organization-units.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: 'OrganizationUnits', schema: OrganizationUnitsSchema },
    ]),
  ],
  controllers: [OrganizationUnitsController],
  providers: [OrganizationUnitsService]
})
export class OrganizationUnitsModule {}
