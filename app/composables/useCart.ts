import { ref } from "vue";

export function useCart() {
  const cart = useState("cart", () => {
    // Rehydrate from localStorage on initial load
    const localCart = import.meta.client ? localStorage.getItem("cart") : null;
    return localCart ? JSON.parse(localCart) : [];
  });

  function addToCart(item) {
    console.log("Adding to cart:", item);
    const existing = cart.value.find((i) => i.id === item.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.value.push({ ...item, qty: 1 });
    }
    if (import.meta.client) {
      localStorage.setItem("cart", JSON.stringify(cart.value));
    }
  }

  function removeFromCart(id) {
    cart.value = cart.value.filter((i) => i.id !== id);
  }

  function clearCart() {
    cart.value = [];
  }

  return { cart, addToCart, removeFromCart, clearCart };
}
