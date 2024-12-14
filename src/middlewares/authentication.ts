import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IUser, User } from "../models/User";

dotenv.config();
const jwt_secret = process.env.JWT_SECRET;

interface CustomRequest extends Request {
  user?: IUser;
}

export const authentication: RequestHandler = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "No token provided" });
      return;
    }

    const payload = jwt.verify(token, jwt_secret as string) as { _id: string };
    const user = await User.findOne({ _id: payload._id, tokens: token });
    if (!user) {
      res.status(401).json({ message: "First you need to login" });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error, message: "Unexpected error with the token" });
    return;
  }
};

export const isAdmin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const admins = ["admin", "superadmin"];
  if (!admins.includes(req.user?.role ?? "")) {
    return res.status(403).send({
      message: "You're not authorized'",
    });
  }
  next();
};
