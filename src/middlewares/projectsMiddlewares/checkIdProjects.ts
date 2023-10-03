import { client } from "../../database/database";
import { AppError } from "../../errors/error";
import { Request, Response, NextFunction } from "express";

export const checkIdProjects = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const query = `SELECT * FROM projects WHERE developerId = ${req.body.developerId}`;

  const data = await client.query(query);
  if (!data.rows.length) {
    throw new AppError("Project not found.", 404);
  }

  return next();
};
