import { Request, Response } from 'express';
import { Product } from '../models/Product';

export const ProductController = {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const product = await Product.create(req.body);
      res
        .status(201)
        .send({ message: 'Product created successfully', product });
    } catch (error) {
      res
        .status(500)
        .send({ message: 'There was an error creating the product', error });
    }
  },
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const products = await Product.find();
      res.status(200).send(products);
    } catch (error) {
      res
        .status(500)
        .send({ message: 'There was an error getting the products', error });
    }
  },
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        res.status(404).send({ message: 'Product not found' });
        return;
      }
      res.status(200).send(product);
    } catch (error) {
      res
        .status(500)
        .send({ message: 'There was an error getting the product', error });
    }
  },
  async update(req: Request, res: Response): Promise<void> {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!product) {
        res.status(404).send({ message: 'Product not found' });
        return;
      }
      res
        .status(200)
        .send({ message: 'Product updated successfully', product });
    } catch (error) {
      res
        .status(500)
        .send({ message: 'There was an error updating the product', error });
    }
  },
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        res.status(404).send({ message: 'Product not found' });
        return;
      }
      res.status(200).send({ message: 'Product deleted successfully' });
    } catch (error) {
      res
        .status(500)
        .send({ message: 'There was an error deleting the product', error });
    }
  },
};
