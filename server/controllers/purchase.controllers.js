import Product from "../models/products.model.js";

export const purchaseOrder = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      res.status(400).json({ error: "Product ID and quantity are required" });
      return;
    }
    if (isNaN(quantity) || quantity <= 0) {
      res.status(400).json({ error: "Quantity must be a positive number" });
      return;
    }
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    product.stock += quantity;
    await product.save();
    res.json({ product, totalCost: product.price * quantity });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
