import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema({ timestamps: true })
export class Admin {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true, unique: true })
  email: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
