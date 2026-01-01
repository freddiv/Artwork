import type { Database, Tables, TablesInsert, TablesUpdate } from '~/types/database.types'

// Type aliases for orders
export type Order = Tables<'orders'>
export type OrderInsert = TablesInsert<'orders'>
export type OrderUpdate = TablesUpdate<'orders'>

/**
 * Order database operations
 */
export const useOrders = () => {
  const supabase = useSupabaseClient<Database>()

  /**
   * Get all orders for a user
   */
  const getUserOrders = async (userId: string) => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    return { data, error }
  }

  /**
   * Get order by ID
   */
  const getOrder = async (orderId: string) => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *
        )
      `)
      .eq('id', orderId)
      .single()
    
    return { data, error }
  }

  /**
   * Create new order
   */
  const createOrder = async (orderData: OrderInsert) => {
    const { data, error } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single()
    
    return { data, error }
  }

  /**
   * Update order
   */
  const updateOrder = async (orderId: string, orderData: OrderUpdate) => {
    const { data, error } = await supabase
      .from('orders')
      .update(orderData)
      .eq('id', orderId)
      .select()
      .single()
    
    return { data, error }
  }

  /**
   * Get orders by status
   */
  const getOrdersByStatus = async (status: string) => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('status', status)
      .order('created_at', { ascending: false })
    
    return { data, error }
  }

  return {
    getUserOrders,
    getOrder,
    createOrder,
    updateOrder,
    getOrdersByStatus
  }
}