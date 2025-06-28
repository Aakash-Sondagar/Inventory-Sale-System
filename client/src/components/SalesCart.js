import {
  FaShoppingCart,
  FaCheckCircle,
  FaRegTimesCircle,
} from "react-icons/fa";

const SalesCart = ({
  cart,
  summary,
  onCompleteSale,
  onRemoveItem,
  loading,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 fade-in">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <FaShoppingCart className="text-green-500" />
        Sales Cart
      </h2>
      {cart.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <i className="fas fa-shopping-basket text-3xl mb-2"></i>
          <p>Your cart is empty</p>
          <p className="text-sm">Add products to start a sale</p>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 rounded-lg p-4 mb-3 border border-gray-200 fade-in"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-800">{item.name}</h3>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaRegTimesCircle />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm mb-2">
                <div>
                  <span className="text-gray-600">Qty:</span>
                  <span className="font-medium ml-1">{item.quantity}</span>
                </div>
                <div>
                  <span className="text-gray-600">Price:</span>
                  <span className="font-medium ml-1">${item.price}</span>
                </div>
                <div>
                  <span className="text-gray-600">Total:</span>
                  <span className="font-medium ml-1">
                    ${item.finalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4 fade-in">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">
                ${summary.subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Markup (20%):</span>
              <span className="font-medium">
                ${summary.totalMarkup.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Discount (10%):</span>
              <span className="font-medium text-red-500">
                -${summary.totalDiscount.toFixed(2)}
              </span>
            </div>
            <div className="border-t border-gray-200 pt-4 flex justify-between">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl font-bold text-green-600">
                ${summary.total.toFixed(2)}
              </span>
            </div>
            <button
              onClick={onCompleteSale}
              disabled={loading}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition duration-300 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i> Processing...
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
