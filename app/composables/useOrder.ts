import { useAuth } from "@/composables/useAuth";

export async function createOrder(cart, total) {
  const { user } = useAuth();
  if (!user.value) throw new Error("You must be signed in to place an order.");

  // Insert order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({ user_id: user.value.id, total, status: "pending" })
    .select()
    .single();
  if (orderError) throw orderError;

  // Insert order items
  const items = cart.map((item) => ({
    order_id: order.id,
    artwork_id: item.id,
    title: item.title,
    price: item.price,
    qty: item.qty,
  }));
  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(items);
  if (itemsError) throw itemsError;

  return order;
}
