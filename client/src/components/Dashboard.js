import { FaBoxes, FaCartPlus, FaBoxOpen } from "react-icons/fa";

const Dashboard = ({ products, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <FaBoxes className="text-indigo-500" />
          Product Dashboard
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            <FaBoxOpen className="fas fa-box-open text-3xl mb-2" />
            <p>No products available</p>
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-indigo-300 transition duration-200 fade-in"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-800">{product.name}</h3>
                <span
                  className={`text-sm ${
                    product.stock < 5 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  <i
                    className={`fas ${
                      product.stock < 5
                        ? "fa-exclamation-circle"
                        : "fa-check-circle"
                    } mr-1`}
                  ></i>
                  {product.stock} in stock
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                ${product.price.toFixed(2)} per unit
              </p>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => onAddToCart(product)}
                  className="text-sm bg-indigo-100 text-indigo-700 hover:bg-indigo-200 py-1 px-3 rounded-lg transition duration-200 flex items-center"
                >
                  <FaCartPlus className="mr-1" />
                  Add to Sale
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
