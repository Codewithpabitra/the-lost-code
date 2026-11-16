import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET;

    if (!secret || !token) {
      res.status(401).json({
        success: false,
        message: "Invalid authentication",
      });
      return;
    }

    const decoded = jwt.verify(token, secret);

    if (typeof decoded === "string" || !decoded.sub) {
      res.status(401).json({
        success: false,
        message: "Invalid token",
      });
      return;
    }

    req.userId = decoded.sub;
    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Session expired or invalid token",
    });
  }
};
