import Product from "../models/products.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      res.status(400).json({ message: "No products found" });
      return;
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {

    const { name, price, quantitystock } = req.body;
    if (!name || !price || !quantitystock) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    if (quantitystock < 0) {
      res
        .status(400)
        .json({ message: "Quantity stock must be greater than 0" });
      return;
    }
    if (price < 0) {
      res
        .status(400)
        .json({ message: "Price must be greater than 0" });
      return;
    }
    if (await Product.findOne({ name }) !== null) {
      res
        .status(400)
        .json({ message: "Product already exists" });
      return;
    }
    const product = await Product.create({
      name,
      price,
      stock: quantitystock,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Product id is required" });
      return;
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid product id" });
      return;
    }
    if (await Product.findById(id) === null) {
      res.status(400).json({ message: "Product not found" });
      return;
    }
    const product = await Product.findByIdAndDelete(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, quantitystock } = req.body;
    if (!id) {
      res.status(400).json({ message: "Product id is required" });
      return;
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid product id" });
      return;
    }
    if (await Product.findById(id) === null) {
      res.status(400).json({ message: "Product not found" });
      return;
    }
    if (!name && !price && !quantitystock) {
      res
        .status(400)
        .json({ message: "At least one field is required" });
      return;
    }
    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        stock: quantitystock,
        updatedAt: new Date().toDateString(),
      },
      { new: true }
    );
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
