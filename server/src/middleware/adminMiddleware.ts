import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user?: { id: Types.ObjectId; role: string };
    }
  }
}

export const AdminMiddleware = async (
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

    const decoded = jwt.verify(token, secretKey) as {
      role: string;
      _id: Types.ObjectId;
    };

    // Debugging output for decoded token
    console.log("Decoded token:", JSON.stringify(decoded, null, 2));

    if (decoded.role !== "admin") {
      res
        .status(403)
        .json({ message: "Access forbidden: insufficient permissions" });
      return;
    }

    req.user = { id: decoded._id, role: decoded.role };
    next();
  } catch (error: any) {
    res.status(401).json({
      message: "Invalid or expired token",
      error: error.message || "Unknown error",
    });
  }
};
