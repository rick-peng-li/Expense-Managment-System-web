import jwt from "jsonwebtoken";
import User from "../models/User.js";

const resolveUserFromToken = async (req) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
    return null;
  }

  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return User.findById(decoded.id).select("-password");
};

export const protect = async (req, res, next) => {
  try {
    const user = await resolveUserFromToken(req);

    if (!user) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    req.user = user;
    return next();
  } catch {
    return res.status(401).json({ message: "Not authorized" });
  }
};

export const optionalProtect = async (req, res, next) => {
  try {
    const user = await resolveUserFromToken(req);
    req.user = user || null;
  } catch {
    req.user = null;
  }

  return next();
};