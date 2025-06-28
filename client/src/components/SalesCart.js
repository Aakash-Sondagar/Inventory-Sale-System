import {
  FaShoppingCart,
  FaCheckCircle,
  FaRegTimesCircle,
  FaSpinner,
} from "react-icons/fa";

const SalesCart = ({
  cart,
  summary,
  onCompleteSale,
  onRemoveItem,
  loading,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 fade-in">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <FaShoppingCart className="text-green-600" />
        Sales Cart
      </h2>

      {cart.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>Your cart is empty</p>
          <p className="text-sm">Add products to start a sale</p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200 shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 transition"
                    title="Remove"
                  >
                    <FaRegTimesCircle size={18} />
                  </button>
                </div>
                <div className="flex justify-between text-sm text-gray-700">
                  <div>
                    Qty: <span className="font-semibold">{item.quantity}</span>
                  </div>
                  <div>
                    Unit Price:{" "}
                    <span className="font-semibold">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                  <div>
                    Total:{" "}
                    <span className="font-semibold">
                      ${item.finalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex justify-between mb-2 text-gray-700">
              <span>Subtotal:</span>
              <span className="font-semibold">
                ${summary.subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mb-2 text-gray-700">
              <span>Markup (20%):</span>
              <span className="font-semibold">
                ${summary.totalMarkup.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mb-4 text-gray-700">
              <span>Discount (10%):</span>
              <span className="font-semibold text-red-500">
                -${summary.totalDiscount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between pt-4 border-t border-gray-200 text-lg font-semibold">
              <span>Total:</span>
              <span className="text-green-600 text-xl font-bold">
                ${summary.total.toFixed(2)}
              </span>
            </div>
            <button
              onClick={onCompleteSale}
              disabled={loading}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition flex items-center justify-center"
            >
              {loading ? (
                <>
                  <FaSpinner className="mr-2" /> Processing...
                </>
              ) : (
                <>
                  <FaCheckCircle className="mr-2" /> Complete Sale
                </>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SalesCart;
