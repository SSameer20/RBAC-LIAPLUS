import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: { id: Types.ObjectId; role: string };
    }
  }
}

export const UserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res
        .status(401)
        .json({ message: "Authorization token missing or invalid" });
      return;
    }

    const token = authHeader.split(" ")[1]; // Extract the token
    const secretKey = process.env.JWT_SECRET || "jwt_secret";

    // Verify the token and decode its payload
    const decoded = jwt.verify(token, secretKey) as {
      _id: Types.ObjectId;
      role: string;
    };

    if (decoded.role !== "user") {
      res
        .status(403)
        .json({ message: "Access forbidden: insufficient permissions" });
      return;
    }

    req.user = { id: decoded._id, role: decoded.role }; // Attach user to the request

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("JWT verification error:", error); // Log the error for debugging
    res.status(401).json({
      message: "Invalid or expired token",
    });
    return;
  }
};
