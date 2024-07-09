import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Organization } from './customer-organization.schema';

@Schema({
  timestamps: true,
  collection: 'customer_api_keys',
})
export class ApiKeys extends Document {
  @Prop({
    type: MongooseSchema.Types.String,
    ref: Organization.name,
    required: true,
    index: true,
    unique: false,
  })
  organizationId: MongooseSchema.Types.String;

  @Prop({
    required: false,
    default: true,
  })
  active: boolean;
}

export const ApiKeysSchema = SchemaFactory.createForClass(ApiKeys);
