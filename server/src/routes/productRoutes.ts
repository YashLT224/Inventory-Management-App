import { Router } from "express";
import { createProduct, getProducts } from "../controllers/productController";

const router = Router();

router.get("/", getProducts);
router.post("/", createProduct);

// router.get("/about", getDashboardMetrics);
export default router;
