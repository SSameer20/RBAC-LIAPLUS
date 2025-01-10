import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: string };
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

    const decoded = jwt.verify(token, secretKey) as {
      role: string;
      _id: string;
    };

    if (decoded.role !== "user") {
      res
        .status(403)
        .json({ message: "Access forbidden: insufficient permissions" });
      return;
    }

    req.user = { id: decoded._id, role: decoded.role };

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid or expired token",
      error: `${error}`,
    });
  }
};
