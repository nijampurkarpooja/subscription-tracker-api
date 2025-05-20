import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.config.js";
import Blacklist from "../models/blacklist.model.js";
import User from "../models/user.model.js";

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      const error = new Error("Name, email, and password are required");
      error.statusCode = 400;
      throw error;
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUsers = await User.create([{ name, email, password: hashedPassword }], { session });
    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    await session.commitTransaction();

    // Send response
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user: {
          name: newUsers[0].name,
          email: newUsers[0].email,
          id: newUsers[0]._id,
        },
      },
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    // Validate password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      throw error;
    }

    // Send response
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: {
        token,
        user: {
          name: user.name,
          email: user.email,
          id: user._id,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(200).json({ success: true, message: "User signed out successfully" });
    }
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(200).json({ success: true, message: "User signed out successfully" });
    }

    // Check if token is already blacklisted
    const isBlacklisted = await Blacklist.findOne({ token });
    if (!isBlacklisted) {
      await Blacklist.create({ token });
    }

    return res.status(200).json({ success: true, message: "User signed out successfully" });
  } catch (error) {
    next(error);
  }
};
