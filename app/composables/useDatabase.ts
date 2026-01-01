// Main database composable that combines all specialized database operations
export { useUsers } from './database/useUsers'
export { useOrders } from './database/useOrders'
export { useOrderItems } from './database/useOrderItems'
export { useAddresses } from './database/useAddresses'
export { useArtworkStock } from './database/useArtworkStock'

// Re-export types for convenience
export type { 
  User, UserInsert, UserUpdate 
} from './database/useUsers'

export type { 
  Order, OrderInsert, OrderUpdate 
} from './database/useOrders'

export type { 
  OrderItem, OrderItemInsert, OrderItemUpdate 
} from './database/useOrderItems'

export type { 
  Address, AddressInsert, AddressUpdate 
} from './database/useAddresses'

export type { 
  ArtworkStock, ArtworkStockInsert, ArtworkStockUpdate 
} from './database/useArtworkStock'

/**
 * Complex database operations that span multiple entities
 */
export const useDatabase = () => {
  const { createOrder } = useOrders()
  const { createOrderItems } = useOrderItems()
  const { getUser } = useUsers()
  const { getUserPrimaryAddress } = useAddresses()

  /**
   * Create complete order with items in a transaction-like manner
   */
  const createCompleteOrder = async (
    orderData: Omit<import('./database/useOrders').OrderInsert, 'id'>,
    items: Omit<import('./database/useOrderItems').OrderItemInsert, 'order_id'>[]
  ) => {
    // Start by creating the order first
    const { data: order, error: orderError } = await createOrder(orderData)
    
    if (orderError || !order) {
      return { data: null, error: orderError }
    }

    // Add order_id to all items
    const itemsWithOrderId = items.map(item => ({
      ...item,
      order_id: order.id
    }))

    // Create order items
    const { data: orderItems, error: itemsError } = await createOrderItems(itemsWithOrderId)
    
    if (itemsError) {
      return { data: null, error: itemsError }
    }

    return { 
      data: { 
        order, 
        items: orderItems 
      }, 
      error: null 
    }
  }

  /**
   * Get user profile with address
   */
  const getUserProfile = async (userId: string) => {
    const [userResult, addressResult] = await Promise.all([
      getUser(userId),
      getUserPrimaryAddress(userId)
    ])

    return {
      user: userResult.data,
      address: addressResult.data,
      errors: {
        user: userResult.error,
        address: addressResult.error
      }
    }
  }

  return {
    // Complex operations
    createCompleteOrder,
    getUserProfile,
    
    // Direct access to specialized composables
    users: useUsers(),
    orders: useOrders(),
    orderItems: useOrderItems(),
    addresses: useAddresses(),
    artworkStock: useArtworkStock()
  }
}