import { createContext, useState, useEffect, useCallback, useMemo} from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/cart/get.php", {
          credentials: "include",
        });
        const data = await res.json();
        setCartItems(data.success && Array.isArray(data.cart) ? data.cart : []);
      } catch (err) {
        console.error("Failed to load cart:", err);
        setCartItems([]);
      }
    };
    fetchCart();
  }, []);

 
  const addToCart = useCallback(async (product) => {
    try {
      const res = await fetch("http://localhost:8000/api/cart/add.php", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...product, quantity: 1 }),
      });
      const data = await res.json();
      if (data.success) setCartItems(data.cart);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  } ,[] );


  const removeFromCart = async (productId) => {
    try {
      const res = await fetch("http://localhost:8000/api/cart/remove.php", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: productId }),
      });
      const data = await res.json();
      if (data.success) setCartItems(data.cart);
    } catch (err) {
      console.error("Failed to remove from cart:", err);
    }
  };

  const clearCart = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/cart/clear.php", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) setCartItems([]);
    } catch (err) {
      console.error("Failed to clear cart:", err);
    }
  };


  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );


  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const checkout = async () => {
    if (cartItems.length === 0) return;

    try {
      const response = await fetch(
        "http://localhost:8000/api/cart/checkout.php",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cartItems: cartItems.map((item) => ({
              id: item.id,
              quantity: item.quantity,
              price: item.price,
            })),
            totalPrice: cartItems.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            ),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert("Checkout failed: " + data.message);
        return;
      }

      setCartItems([]);
      alert(`Order #${data.order_id} successfully placed!`);
    } catch (err) {
      console.error("Checkout exception:", err);
      alert("An error occurred during checkout.");
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, checkout, clearCart, cartCount , totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};
