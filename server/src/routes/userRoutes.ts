import { Router } from "express";
import {  getUsers } from "../controllers/userController";

const router = Router();

router.get("/", getUsers);

// router.get("/about", getDashboardMetrics);
export default router;
