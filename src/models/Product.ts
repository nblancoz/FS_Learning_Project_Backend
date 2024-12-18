import mongoose, { Document, Schema } from 'mongoose'

export interface IProduct extends Document {
  name: string
  type: string
  brand: string
  price: number
  description: string
  image: string
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    brand: {
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
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

export const Product = mongoose.model<IProduct>('Product', ProductSchema)
