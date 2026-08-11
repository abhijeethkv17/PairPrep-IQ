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
import { submitSolution } from "../controllers/submissionController.js";

const router = express.Router();

router.get("/", protectRoute, getProblems);
router.get("/:id", protectRoute, getProblemById);
router.post("/", protectRoute, requireAdmin, createProblem);
router.put("/:id", protectRoute, requireAdmin, updateProblem);
router.delete("/:id", protectRoute, requireAdmin, deleteProblem);
router.post("/:id/submit", protectRoute, submitSolution);

export default router;
