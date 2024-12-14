import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";
import argon2 from "argon2";

export const UserController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.role = "user";
      const hashedPassword = await argon2.hash(req.body.password);
      const user = await User.create({ ...req.body, password: hashedPassword });
      res.status(201).send({
        message: "User created succesfully",
        user,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};
