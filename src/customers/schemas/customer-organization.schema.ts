import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import {
  CustomerAddressSchema,
  CustomerAddress,
} from './customer-address.schema';

@Schema({
  timestamps: true,
  collection: 'customer_organizations',
})
export class Organization extends Document {
  @Prop({ required: true, trim: true, maxlength: 100 })
  name: string;

  @Prop({ required: true, maxlength: 1000 })
  logoUrl: string;

  @Prop({
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending',
  })
  kycStatus: string;

  @Prop([
    {
      type: {
        type: String,
        enum: ['passport', 'driverLicense', 'nationalID', 'other'],
      },
      documentId: String,
      documentImage: String,
    },
  ])
  kycDocuments: Array<{
    type: string;
    documentId: string;
    documentImage: string;
  }>;

  @Prop({
    type: CustomerAddressSchema,
    default: {},
  })
  address: CustomerAddress;

  @Prop([{ type: MongooseSchema.Types.String, ref: 'User' }])
  members: MongooseSchema.Types.String[];
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
