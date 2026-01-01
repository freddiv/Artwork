import type { Database, Tables, TablesInsert, TablesUpdate } from '~/types/database.types'

// Type aliases for artwork stock
export type ArtworkStock = Tables<'artwork_stock'>
export type ArtworkStockInsert = TablesInsert<'artwork_stock'>
export type ArtworkStockUpdate = TablesUpdate<'artwork_stock'>

/**
 * Artwork stock database operations
 */
export const useArtworkStock = () => {
  const supabase = useSupabaseClient<Database>()

  /**
   * Get artwork stock
   */
  const getArtworkStock = async (artworkId: number) => {
    const { data, error } = await supabase
      .from('artwork_stock')
      .select('*')
      .eq('artwork_id', artworkId)
      .single()
    
    return { data, error }
  }

  /**
   * Get all artwork stock
   */
  const getAllArtworkStock = async () => {
    const { data, error } = await supabase
      .from('artwork_stock')
      .select('*')
    
    return { data, error }
  }

  /**
   * Update artwork stock
   */
  const updateArtworkStock = async (artworkId: number, stockData: ArtworkStockUpdate) => {
    const { data, error } = await supabase
      .from('artwork_stock')
      .update(stockData)
      .eq('artwork_id', artworkId)
      .select()
      .single()
    
    return { data, error }
  }

  /**
   * Create or update artwork stock (upsert)
   */
  const upsertArtworkStock = async (stockData: ArtworkStockInsert) => {
    const { data, error } = await supabase
      .from('artwork_stock')
      .upsert(stockData, { onConflict: 'artwork_id' })
      .select()
      .single()
    
    return { data, error }
  }

  /**
   * Check if artwork is in stock
   */
  const isArtworkInStock = async (artworkId: number, requestedQty: number = 1) => {
    const { data, error } = await getArtworkStock(artworkId)
    
    if (error || !data) {
      return { inStock: false, available: 0, error }
    }
    
    const available = data.stock || 0
    return { 
      inStock: available >= requestedQty, 
      available, 
      error: null 
    }
  }

  /**
   * Decrease stock after purchase
   */
  const decreaseStock = async (artworkId: number, quantity: number) => {
    const { data: currentStock } = await getArtworkStock(artworkId)
    
    if (!currentStock) {
      return { data: null, error: new Error('Artwork not found') }
    }
    
    const newStock = (currentStock.stock || 0) - quantity
    
    return await updateArtworkStock(artworkId, { stock: Math.max(0, newStock) })
  }

  return {
    getArtworkStock,
    getAllArtworkStock,
    updateArtworkStock,
    upsertArtworkStock,
    isArtworkInStock,
    decreaseStock
  }
}