import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import argon2 from "argon2";

const UserController = {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await User.create(req.body);
      res.status(201).send({
        message: "User created successfully",
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
          message: "User not found",
        });
      }
      if (await argon2.verify(user?.password ?? "", req.body.password)) {
        res.status(200).send({
          message: "User logged in successfully",
          user,
        });
      }
      res.status(401).send({
        message: "Invalid password",
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};

export default UserController;
