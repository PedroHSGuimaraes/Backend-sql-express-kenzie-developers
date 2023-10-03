import { QueryConfig } from "pg";
import { client } from "../../database/database";
import { AppError } from "../../errors/error";
import { Request, Response, NextFunction } from "express";

export const checkInfos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const checkQuery: QueryConfig = {
    text: "SELECT * FROM developerInfos WHERE developerId = $1",
    values: [id],
  };

  const existingInfo = await client.query(checkQuery);

  if (existingInfo.rows.length > 0) {
    throw new AppError("Developer infos already exists.", 409);
  }
  return next();
};
