import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'customer_addresses',
})
export class CustomerAddress extends Document {
  @Prop({ trim: true, maxlength: 100 })
  street: string;

  @Prop({ trim: true, maxlength: 50 })
  city: string;

  @Prop({ trim: true, maxlength: 50 })
  state: string;

  @Prop({ trim: true, maxlength: 50 })
  country: string;

  @Prop({ trim: true, maxlength: 10 })
  postalCode: string;
}
export const CustomerAddressSchema =
  SchemaFactory.createForClass(CustomerAddress);
