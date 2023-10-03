import { QueryConfig } from "pg";
import { Request, Response, NextFunction } from "express";
import { client } from "../../database/database";
import { AppError } from "../../errors/error";

export const checkEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const queryString = ` SELECT * FROM developers WHERE email = $1`;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [req.body.email],
  };
  const data = await client.query(queryConfig);
  if (data.rows.find((dev) => dev.email === req.body.email)) {
    throw new AppError("Email already exists.", 409);
  }

  return next();
};
