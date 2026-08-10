import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import {
  createProblem,
  getProblems,
  getProblemById,
  updateProblem,
  deleteProblem,
} from "../controllers/problemController.js";

const router = express.Router();

router.get("/", protectRoute, getProblems);
router.get("/:id", protectRoute, getProblemById);
router.post("/", protectRoute, requireAdmin, createProblem);
router.put("/:id", protectRoute, requireAdmin, updateProblem);
router.delete("/:id", protectRoute, requireAdmin, deleteProblem);

export default router;
