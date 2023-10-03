import { Router } from "express";
import {
  createProjectController,
  getProjectByIdController,
  updateProjectController,
} from "../controllers/project.controllers";
import { checkIdProjects } from "../middlewares/projectsMiddlewares/checkIdProjects";
import { checkId } from "../middlewares/devlopersMiddlewares/checkId";

const router = Router();
router.get("/:id", checkId, getProjectByIdController);
router.post("/", checkIdProjects, createProjectController);
router.patch("/:id", checkId, checkIdProjects, updateProjectController);

export default router;
