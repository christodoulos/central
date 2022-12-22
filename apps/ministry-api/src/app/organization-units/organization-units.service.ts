import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { OrganizationUnits, OrganizationUnitsDocument } from './organization-units.schema';

@Injectable()
export class OrganizationUnitsService {
  constructor(
    @InjectModel('OrganizationUnits')
    private ouModel: Model<OrganizationUnitsDocument>
  ) {}

  async get_all(): Promise<OrganizationUnits[]> {
    return this.ouModel.find().exec();
  }

  async get_by_id(id: string): Promise<OrganizationUnits> {
    return this.ouModel.findById(id).exec();
  }
}
