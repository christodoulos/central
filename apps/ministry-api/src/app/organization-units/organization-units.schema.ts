import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import uniqueValidator = require("mongoose-unique-validator");

const unitSchema = new mongoose.Schema({ 
  "code": {
    "type": "String",
    "unique": true
  },
  "organizationCode": {
    "type": "String",
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
  "unitType": {
    "id": {
      "type": "String"
    },
    "description": {
      "type": "String"
    }
  },
  "surervisorUnitCode": {
    "code":{
      "type": "String"
    },
    "preferredLabel":{
      "type":"String"
    }
  }
 });

export type OrganizationUnitsDocument = HydratedDocument<typeof OrganizationUnitsSchema>;

export type OrganizationUnits = typeof OrganizationUnitsSchema;

export const OrganizationUnitsSchema = new mongoose.Schema(
  {
    "code": {
      "type": "String",
      "unique": true
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
    "units":[unitSchema]
  },
  { 
    id: true,
    toJSON: {
      transform(doc, ret){
        ret.id = ret._id
        delete ret._id
      }
    },
    collection: 'organization__units' 
  }
);

// Apply the uniqueValidator plugin to OrganizationUnitsSchema.
OrganizationUnitsSchema.plugin( uniqueValidator, {message: 'Code must be unique'});