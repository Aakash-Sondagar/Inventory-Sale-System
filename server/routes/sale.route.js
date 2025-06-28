import express from "express";

import { salesOrder } from "../controllers/sales.controllers.js";

const router = express.Router();

router.post("/", salesOrder);

export default router;
