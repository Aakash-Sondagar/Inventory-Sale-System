import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  createdAt: {
    type: Date,
    default: new Date().toDateString(),
  },
  updatedAt: {
    type: Date,
    default: new Date().toDateString(),
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
