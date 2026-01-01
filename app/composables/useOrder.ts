import { useAuth } from "@/composables/useAuth";
import { useDatabase, type OrderInsert, type OrderItemInsert } from "@/composables/useDatabase";

export async function createOrder(cart: any[], total: number) {
  const { user } = useAuth();
  const { createCompleteOrder } = useDatabase();
  
  if (!user.value) throw new Error("You must be signed in to place an order.");

  const userId = user.value?.id;
  if (!userId) throw new Error("User ID is missing.");

  // Prepare order data
  const orderData: Omit<OrderInsert, 'id'> = {
    user_id: userId,
    total,
    status: "pending"
  };

  // Prepare order items data
  const items: Omit<OrderItemInsert, 'order_id'>[] = cart.map((item) => ({
    user_id: userId,
    artwork_id: item.id,
    title: item.title,
    price: item.price,
    qty: item.qty,
  }));

  // Create order with items using the database helper
  const { data, error } = await createCompleteOrder(orderData, items);
  
  if (error) throw error;
  
  return data?.order;
}
