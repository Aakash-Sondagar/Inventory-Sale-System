import { FaTruckLoading, FaPlusCircle, FaSpinner } from "react-icons/fa";

const PurchaseSection = ({
  products,
  selectedProduct,
  onSelectProduct,
  purchaseQuantity,
  onQuantityChange,
  onPurchase,
  loading,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-6 fade-in">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <FaTruckLoading className="text-blue-500" />
        Purchase Products
      </h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product
        </label>
        <select
          value={selectedProduct || ""}
          onChange={(e) => onSelectProduct(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.name} (${product.price.toFixed(2)})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Quantity
        </label>
        <input
          type="number"
          min="1"
          value={purchaseQuantity}
          onChange={(e) => onQuantityChange(parseInt(e.target.value))}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={onPurchase}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition duration-300 flex items-center justify-center"
      >
        {loading ? (
          <>
            <FaSpinner className="fas fa-spinner fa-spin mr-2" />
            Processing...
          </>
        ) : (
          <>
            <FaPlusCircle className="mr-2" />
            Add to Inventory
          </>
        )}
      </button>
    </div>
  );
};

export default PurchaseSection;
