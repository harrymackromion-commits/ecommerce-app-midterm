import { useContext } from "react";
import { CartContext } from "../../../Context/CartContext";
import { X } from "lucide-react"; 

export default function Cart({ onClose }) {
  const { cartItems, removeFromCart, clearCart, totalPrice, } =
    useContext(CartContext);

  if (cartItems.length === 0)
    return (
      <div
        className="relative flex flex-col items-center justify-center bg-white rounded-xl shadow-md min-h-[75px] w-full"
        style={{ minHeight: 150, width: "100%" }}
      >
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl transition-colors"
          onClick={onClose}
          aria-label="Close cart"
        >
          <X size={14} />
        </button>
        <p className="text-gray-400 text-lg font-semibold text-center">Your cart is empty.</p>
      </div>
    );

  return (
    <div
      className="cart relative w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 min-h-[75px]"
      style={{ minHeight: 75, width: "100%" }}
    >
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl transition-colors"
        onClick={onClose}
        aria-label="Close cart"
      >
        <X size={8} />
      </button>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Cart</h2>
        <button onClick={clearCart} className=" ">
          Clear Cart
        </button>
      </div>

      <div className="cart-items space-y-4 max-h-80 overflow-y-auto">
        <ul className="list-group">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div className="d-flex align-items-center">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: 60,
                      height: 60,
                      objectFit: "cover",
                      marginRight: 10,
                      borderRadius: 8,
                      border: "1px solid #ddd",
                    }}
                  />
                )}
                <div>
                  <strong>{item.name}</strong>
                  <p className="mb-1 text-muted">
                    ₱{item.price} × {item.quantity}
                  </p>
                  <span className="badge bg-secondary">
                    ₱{item.price * item.quantity}
                  </span>
                </div>
              </div>

              {/* Remove Button */}
              <div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Checkout
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-between mt-6 pt-4 border-t">
        <h3 className="text-lg font-semibold text-gray-700">
          Total:{" "}
          <span className="text-xl font-bold text-blue-600">₱{totalPrice}</span>
        </h3>
      </div>
    </div>
  );
}
