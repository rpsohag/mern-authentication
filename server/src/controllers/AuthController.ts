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
      return res.status(200).json({
        success: false,
        message: "User not found!",
      });
    }
    const validPassword = bcryptjs.compareSync(password, existUser.password);
    if (!validPassword) {
      return res.status(200).json({
        success: false,
        message: "Invalid email or password!",
      });
    }
    const token = jwt.sign({ id: existUser._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successfull",
      data: existUser,
      token,
    });
  } catch (error) {
    next(error);
  }
};
