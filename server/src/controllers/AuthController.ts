import { Request, Response, NextFunction } from "express";
import bcryptjs, { hashSync } from "bcryptjs";
import jwt from "jsonwebtoken";
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
      success: true,
      message: "User registration successfull",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(400).json({
        success: false,
        message: "User not found!",
      });
    }
    const validPassword = bcryptjs.compareSync(password, existUser.password);
    if (!validPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password!",
      });
    }
    const token = jwt.sign({ id: existUser._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.cookie("access_token", token, {
      httpOnly: true,
      path: "/",
      expires: new Date(Date.now() + 1000 * 60),
      sameSite: "lax",
    });

    return res.status(201).json({
      success: true,
      message: "Login successfull",
      data: existUser,
    });
  } catch (error) {
    next(error);
  }
};
