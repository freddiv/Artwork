import type { Database, Tables, TablesInsert, TablesUpdate } from '~/types/database.types'

// Type aliases for order items
export type OrderItem = Tables<'order_items'>
export type OrderItemInsert = TablesInsert<'order_items'>
export type OrderItemUpdate = TablesUpdate<'order_items'>

/**
 * Order item database operations
 */
export const useOrderItems = () => {
  const supabase = useSupabaseClient<Database>()

  /**
   * Get order items for an order
   */
  const getOrderItems = async (orderId: string) => {
    const { data, error } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', orderId)
    
    return { data, error }
  }

  /**
   * Create order items (batch insert)
   */
  const createOrderItems = async (items: OrderItemInsert[]) => {
    const { data, error } = await supabase
      .from('order_items')
      .insert(items)
      .select()
    
    return { data, error }
  }

  /**
   * Update order item
   */
  const updateOrderItem = async (userId: string, itemData: OrderItemUpdate) => {
    const { data, error } = await supabase
      .from('order_items')
      .update(itemData)
      .eq('user_id', userId)
      .select()
      .single()
    
    return { data, error }
  }

  /**
   * Delete order item
   */
  const deleteOrderItem = async (userId: string) => {
    const { data, error } = await supabase
      .from('order_items')
      .delete()
      .eq('user_id', userId)
      .select()
    
    return { data, error }
  }

  /**
   * Get order items by artwork
   */
  const getOrderItemsByArtwork = async (artworkId: number) => {
    const { data, error } = await supabase
      .from('order_items')
      .select('*')
      .eq('artwork_id', artworkId)
    
    return { data, error }
  }

  return {
    getOrderItems,
    createOrderItems,
    updateOrderItem,
    deleteOrderItem,
    getOrderItemsByArtwork
  }
}