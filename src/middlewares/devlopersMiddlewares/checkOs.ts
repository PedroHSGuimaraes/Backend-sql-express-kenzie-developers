import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/error";

export const checkOS = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validOS = ["Windows", "Linux", "MacOS"];
  const userOS = req.body.preferredOS;
  if (!validOS.includes(userOS)) {
    throw new AppError("Invalid OS option.", 400);
  }

  return next();
};
