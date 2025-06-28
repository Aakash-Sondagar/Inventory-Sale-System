import Product from "../models/products.model.js";

export const salesOrder = async (req, res) => {
  try {
    const { cart } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }
    for (const item of cart) {
      const product = await Product.findById(item.id);
      if (!product) {
        return res
          .status(404)
          .json({ error: `Product with id ${item.id} not found` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({
          error: `Not enough stock for ${product.name}. Available: ${product.stock}`,
        });
      }
    }

    let subtotal = 0;
    let totalMarkup = 0;
    let totalDiscount = 0;

    for (const item of cart) {
      const product = await Product.findById(item.id);
      product.stock -= item.quantity;
      await product.save();

      const markupPrice = product.price * 0.2;
      const discountedPrice = (product.price + markupPrice) * 0.9;
      const itemTotal = discountedPrice * item.quantity;

      subtotal += product.price * item.quantity;
      totalMarkup += markupPrice * item.quantity;
      totalDiscount += (product.price + markupPrice) * 0.1 * item.quantity;
    }

    const total = subtotal + totalMarkup - totalDiscount;

    res.json({
      success: true,
      total,
      summary: {
        subtotal,
        totalMarkup,
        totalDiscount,
        total,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
