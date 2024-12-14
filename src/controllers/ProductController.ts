import { Request, Response } from "express";
import { Product } from "../models/Product";

export const ProductController = {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const product = await Product.create(req.body);
      res
        .status(201)
        .send({ message: "Product created successfully", product });
    } catch (error) {
      res
        .status(500)
        .send({ message: "There was an error creating the product", error });
    }
  },
};
