import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/User';
import argon2 from 'argon2';

dotenv.config();
const jwt_secret = process.env.JWT_SECRET;

const UserController = {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await User.create(req.body);
      res.status(201).send({
        message: 'User created successfully',
        user,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        res.status(404).send({
          message: 'User not found',
        });
        return;
      }
      if (await argon2.verify(user.password, req.body.password)) {
        const token = jwt.sign({ _id: user._id }, jwt_secret as string);
        if (user.tokens.length > 1) user.tokens.shift();
        user.tokens.push(token);
        await user.save();
        res.status(200).send({
          message: 'Welcome ' + user.name,
          user,
          token,
        });
        return;
      }
      res.status(401).send({
        message: 'Invalid password',
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Unexpected error in the login', error });
    }
  },
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await User.find();
      res.status(200).send({
        message: 'Users retrieved successfully',
        users,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: 'Unexpected error retrieving the users', error });
    }
  },
  async getOne(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        res.status(404).send({
          message: 'User not found',
        });
      }
      res.status(200).send({
        message: 'User retrieved successfully',
        user,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: 'Unexpected error retrieving the user', error });
    }
  },
  async update(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!user) {
        res.status(404).send({
          message: 'User not found',
        });
      }
      res.status(200).send({
        message: 'User updated successfully',
        user,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: 'Unexpected error updating the user', error });
    }
  },
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        res.status(404).send({
          message: 'User not found',
        });
      }
      res.status(200).send({
        message: 'User deleted successfully',
        user,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: 'Unexpected error deleting the user', error });
    }
  },
  async logout(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        res
          .status(400)
          .send({ message: 'No token provided, already logged out' });
        return;
      }
      const payload = jwt.verify(token, process.env.JWT_SECRET as string) as {
        _id: string;
      };
      const user = await User.findByIdAndUpdate(payload._id, {
        $pull: { tokens: token },
      });
      if (!user) {
        res.status(404).send({ message: 'User not found' });
        return;
      }
      res.send({ message: 'Successfully logged out' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Unexpected error logging out', error });
    }
  },
};

export default UserController;
