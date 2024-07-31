import { Schema, model, Document } from 'mongoose';

interface IProductCategory extends Document {
  // productId : Schema.Types.ObjectId;
  name: string;
  category:string;
  description?: string;
}

const ProductCategorySchema = new Schema<IProductCategory>({
  // productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true},
  description: { type: String }
});

const ProductCategory = model<IProductCategory>('ProductCategory', ProductCategorySchema);
export default ProductCategory;
