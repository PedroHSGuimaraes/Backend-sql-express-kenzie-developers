import { Request, Response } from "express";
import {
  createDeveloper,
  createDeveloperInfo,
  deleteDeveloper,
  getDeveloperById,
  updateDeveloper,
} from "../services/developer.services";

export const getDeveloperByIdController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const response = await getDeveloperById(id);
  return res.status(200).json(response);
};

export const createDeveloperController = (req: Request, res: Response) => {
  const { name, email } = req.body;
  const response = createDeveloper(name, email);
  return res.status(201).json(response);
};

export const createDeveloperInfoController = (req: Request, res: Response) => {
  const { developerSince, preferredOS } = req.body;
  const { id } = req.params;
  const response = createDeveloperInfo(developerSince, preferredOS, id);

  return res.status(201).json(response);
};

export const updateDeveloperController = (req: Request, res: Response) => {
  const { name, email } = req.body;
  const { id } = req.params;
  const response = updateDeveloper(name, email, id);
  return res.status(200).json(response);
};

export const deleteDeveloperController = (req: Request, res: Response) => {
  const { id } = req.params;
  const response = deleteDeveloper(id);

  return res.status(204).json(response);
};
