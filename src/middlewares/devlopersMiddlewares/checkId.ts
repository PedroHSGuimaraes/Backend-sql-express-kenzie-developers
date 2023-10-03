import { QueryConfig } from "pg";
import { client } from "../../database/database";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/error";

export const checkId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const queryString = ` SELECT * FROM developers WHERE id = $1`;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [req.params.id],
  };
  const data = await client.query(queryConfig);
  if (!data.rows.length) {
    throw new AppError("Developer not found.", 404);
  }

  return next();
};
