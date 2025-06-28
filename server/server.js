import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectMongoDb from "./db/connectMongoDB.js";

import productRouter from "./routes/products.route.js";
import purchaseRoute from "./routes/purchase.route.js";
import saleRoute from "./routes/sale.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);
app.use("/api/purchase", purchaseRoute);
app.use("/api/sale", saleRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    await connectMongoDb();
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.log(error.message);
  }
});
