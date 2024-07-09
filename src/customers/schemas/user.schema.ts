import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Organization } from './customer-organization.schema';

/**
 * Customer Schema
 *
 * @property {String} firstName - The user's first name. Required, must be trimmed, and cannot exceed 50 characters.
 * @property {String} lastName - The user's last name. Required, must be trimmed, and cannot exceed 50 characters.
 * @property {String} email - The user's email address. Required, must be unique, must be trimmed, cannot exceed 100 characters, and must match a valid email address format.
 * @property {String} password - The user's password. Required and must be at least 6 characters long.
 * @property {String} phoneNumber - The user's phone number. Optional, must be trimmed, and cannot exceed 15 characters.
 * @property {Date} dateOfBirth - The user's date of birth. Optional.
 * @property {Boolean} isActive - Whether the user is active. Defaults to true.
 * @property {Boolean} isDeleted - Whether the user is deleted. Defaults to false.
 * @property {Date} lastLoginDate - The date and time the user login. Defaults to null.
 * @property {string} role - The user's role. One of 'admin', 'merchant', 'developer' , or 'user'. Defaults to 'user'.
 * @property {Schema.Types.ObjectId} organization - The unique identifier of the organization associated with the user. Optional.
 */

@Schema({
  timestamps: true,
  collection: 'customers',
})
export class Customer extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({
    required: true,
    unique: true,
    trim: true,
    maxlength: 100,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ trim: true, unique: true, maxlength: 15 })
  phoneNumber: string;

  @Prop()
  dateOfBirth: Date;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: null })
  lastLoginDate: Date;

  @Prop({
    enum: ['admin', 'merchant', 'developer', 'user'],
    default: 'user',
  })
  role: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Organization.name,
    required: false,
  })
  organization: MongooseSchema.Types.ObjectId;

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}

const CustomerSchema = SchemaFactory.createForClass(Customer);

CustomerSchema.pre('save', async function (next) {
  // console.log('🚀 FUCK 🚀', this);
  const user = this as Customer;

  // Hash the password only if it's modified (or new)
  if (!user.isModified('password')) {
    return next();
  }

  try {
    // Generate a salt and hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    // Replace the plain password with the hashed password
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});
// pre update hook
CustomerSchema.pre('findOneAndUpdate', async function (next) {
  const password = this.get('password');
  // console.log('😡 BITCH 😡', password);
  if (!password) {
    return next();
  }
  try {
    // Generate a salt and hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Replace the plain password with the hashed password
    this.set('password', hashedPassword);
    next();
  } catch (error) {
    return next(error);
  }
});
export { CustomerSchema };
