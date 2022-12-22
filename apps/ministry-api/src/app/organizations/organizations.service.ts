import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Organization, OrganizationDocument } from './organizations.schema';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectModel('Organization')
    private oModel: Model<OrganizationDocument>
  ) {}

  async get_all(): Promise<Organization[]> {
    return this.oModel.find().exec();
  }

  async get_by_id(id: string): Promise<Organization> {
    return this.oModel.findById(id).exec();
  }

}
