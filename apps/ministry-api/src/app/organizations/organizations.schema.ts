import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type OrganizationDocument = HydratedDocument<typeof OrganizationSchema>;

export type Organization = typeof OrganizationSchema;

export const OrganizationSchema = new mongoose.Schema(
  {
    // "id": {
    //   "type":"ObjectId"
    // },
    "code": {
      "type": "String"
    },
    "preferredLabel": {
      "type": "String"
    },
    "alternativeLabels": {
      "type": [
        "String"
      ]
    },
    "purpose": {
      "type": [
        "Mixed"
      ]
    },
    "identifier": {
      "type": "String"
    },
    "subOrganizationOf": {
      "code": {
        "type": "String"
      },
      "preferredLabel": {
        "type": "String"
      }
    },
    "organizationType": {
      "id": {
        "type": "Number"
      },
      "description": {
        "type": "String"
      }
    },
    "description": {
      "type": "String"
    },
    "status": {
      "type": "String"
    },
    "foundationDate": {
      "type": "Date"
    },
    "terminationDate": {
      "type": "Date"
    },
    "foundationFek": {
      "year": {
        "type": "Number"
      },
      "number": {
        "type": "String"
      },
      "issue": {
        "type": "String"
      }
    },
    "organization_units": {
      "type": "Number"
    }
  },
  { 
    id: true,
    toJSON: {
      transform(doc, ret){
        ret.id = ret._id
        delete ret._id
      }
    },
    collection: 'organizations' 
  }
);