import { useEffect, useState } from "react";
import axios from "axios";

import Dashboard from "./components/Dashboard";
import PurchaseSection from "./components/PurchaseSection";
import SalesCart from "./components/SalesCart";
import SuccessModal from "./components/SuccessModal";
import ErrorModal from "./components/ErrorModal";

import { FaStore } from "react-icons/fa";

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);
  const [cart, setCart] = useState([]);

  const [summary, setSummary] = useState({
    subtotal: 0,
    totalMarkup: 0,
    totalDiscount: 0,
    total: 0,
  });

  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState({
    show: false,
    type: "success",
    title: "",
    message: "",
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      setModal({
        show: true,
        type: "error",
        title: "Error",
        message: "Failed to load products.",
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handlePurchase = async () => {
    if (!selectedProductId) {
      setModal({
        show: true,
        type: "error",
        title: "Selection Required",
        message: "Select a product.",
      });
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/purchase", {
        productId: selectedProductId,
        quantity: purchaseQuantity,
      });
      setModal({
        show: true,
        type: "success",
        title: "Purchase Successful",
        message: `Added ${purchaseQuantity} ${res.data.product.name} to inventory.`,
      });
      fetchProducts();
    } catch (err) {
      setModal({
        show: true,
        type: "error",
        title: "Error",
        message: err.response?.data?.error || "Purchase failed",
      });
    }
    setLoading(false);
  };

  const handleAddToCart = (product) => {
    const existing = cart.find((i) => i.id === product.id);
    if (existing) {
      setModal({
        show: true,
        type: "error",
        title: "Already in Cart",
        message: `${product.name} is already in cart.`,
      });
    } else {
      const item = {
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        markup: 0.2,
        discount: 0.1,
        finalPrice: product.price * 1.2 * 0.9 * 1,
      };
      setCart([...cart, item]);
    }
  };

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleCompleteSale = async () => {
    if (cart.length === 0) {
      setModal({
        show: true,
        type: "error",
        title: "Empty Cart",
        message: "Add items to complete sale",
      });
      return;
    }
    setLoading(true);
    console.log("cart", cart)
    try {
      const res = await axios.post("http://localhost:5000/api/sale", { cart });
      setModal({
        show: true,
        type: "success",
        title: "Sale Completed",
        message: `Sale completed successfully. Total: $${res.data.total.toFixed(
          2
        )}`,
      });
      setCart([]);
      fetchProducts();
    } catch (err) {
      setModal({
        show: true,
        type: "error",
        title: "Error",
        message: err.response?.data?.error || "Sale failed",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const totalMarkup = cart.reduce(
      (sum, i) => sum + i.price * i.markup * i.quantity,
      0
    );
    const totalDiscount = cart.reduce((sum, i) => {
      const priceWithMarkup = i.price * (1 + i.markup);
      return sum + priceWithMarkup * i.discount * i.quantity;
    }, 0);
    const total = subtotal + totalMarkup - totalDiscount;

    setSummary({ subtotal, totalMarkup, totalDiscount, total });
  }, [cart]);

  const selectedProduct = products.find((p) => p.id === selectedProductId);

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 font-sans">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-indigo-700 flex items-center">
          <FaStore className="fas fa-store mr-3" />
          Inventory Sale System
        </h1>
        <p className="text-gray-600 mt-2">
          Manage inventory purchases and sales with markup and discounts
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Dashboard products={products} onAddToCart={handleAddToCart} />
          <SalesCart
            cart={cart}
            summary={summary}
            onCompleteSale={handleCompleteSale}
            onRemoveItem={handleRemoveFromCart}
            loading={loading}
          />
        </div>

        {/* Purchase section */}
        <PurchaseSection
          products={products}
          selectedProduct={selectedProductId}
          onSelectProduct={setSelectedProductId}
          purchaseQuantity={purchaseQuantity}
          onQuantityChange={setPurchaseQuantity}
          onPurchase={handlePurchase}
          unitPrice={selectedProduct ? selectedProduct.price : 0}
          totalPurchase={
            selectedProduct ? selectedProduct.price * purchaseQuantity : 0
          }
          loading={loading}
        />
      </div>

      {/* Modals */}
      {modal.type === "success" ? (
        <SuccessModal
          show={modal.show}
          onClose={() => setModal({ ...modal, show: false })}
          title={modal.title}
          message={modal.message}
        />
      ) : (
        <ErrorModal
          show={modal.show}
          onClose={() => setModal({ ...modal, show: false })}
          title={modal.title}
          message={modal.message}
        />
      )}
    </div>
  );
}

export default App;
