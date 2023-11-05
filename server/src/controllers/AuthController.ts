import { Request, Response, NextFunction } from "express";
import bcryptjs, { hashSync } from "bcryptjs";
import User from "../models/User.model";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;
  try {
    const salt = bcryptjs.genSaltSync(10);
    const hashPassword = hashSync(password, salt);
    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });
    return res.status(201).json({
      message: "User registration successfull",
      user,
    });
  } catch (error) {
    next(error);
  }
};
