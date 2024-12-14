import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>("Product", ProductSchema);
