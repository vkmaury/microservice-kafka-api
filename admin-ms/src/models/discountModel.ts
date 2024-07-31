// models/discountModel.ts
import { Schema, model, Document } from 'mongoose';

export interface IDiscount extends Document {
  code: string;
  percentage: number;
  description: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

const discountSchema = new Schema<IDiscount>({
  code: { type: String, required: true, unique: true },
  percentage: { type: Number, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
});

export default model<IDiscount>('Discount', discountSchema);
