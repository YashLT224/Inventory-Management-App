import { Router } from "express";
 import { getDashboardMetrics } from "../controllers/dashboardController";

const router = Router();

router.get("/", getDashboardMetrics);

// router.get("/about", getDashboardMetrics);
export default router;
