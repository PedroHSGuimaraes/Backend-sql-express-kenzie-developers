import { Router } from "express";
import {
  createDeveloperController,
  createDeveloperInfoController,
  deleteDeveloperController,
  getDeveloperByIdController,
  updateDeveloperController,
} from "../controllers/developer.controllers";
import { checkId } from "../middlewares/devlopersMiddlewares/checkId";
import { checkEmail } from "../middlewares/devlopersMiddlewares/checkEmail";
import { checkInfos } from "../middlewares/devlopersMiddlewares/checkInfos";
import { checkOS } from "../middlewares/devlopersMiddlewares/checkOs";

const router = Router();

router.get("/:id", checkId, getDeveloperByIdController);
router.post("/", checkEmail, createDeveloperController);
router.post(
  "/:id/infos",
  checkId,
  checkOS,
  checkInfos,
  createDeveloperInfoController
);
router.patch("/:id", checkId, checkEmail, updateDeveloperController);
router.delete("/:id", checkId, deleteDeveloperController);

export default router;
