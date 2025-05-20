import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.config.js";
import Blacklist from "../models/blacklist.model.js";
import User from "../models/user.model.js";

const authorize = async (req, res, next) => {
  try {
    let token;

    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Check if token is blacklisted
    const isBlacklisted = await Blacklist.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Decode token
    const decoded = jwt.verify(token, JWT_SECRET);


    // Check if token has expired
    if (dayjs(decoded.exp * 1000).isBefore(dayjs())) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Get user from token
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized", error: error.message });
  }
};

export default authorize;
