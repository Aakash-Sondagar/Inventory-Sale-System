import express from "express";

import { purchaseOrder } from "../controllers/purchase.controllers.js";

const router = express.Router();

router.post("/", purchaseOrder);

export default router;
