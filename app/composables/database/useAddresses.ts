import type { Database, Tables, TablesInsert, TablesUpdate } from '~/types/database.types'

// Type aliases for addresses
export type Address = Tables<'address'>
export type AddressInsert = TablesInsert<'address'>
export type AddressUpdate = TablesUpdate<'address'>

/**
 * Address database operations
 */
export const useAddresses = () => {
  const supabase = useSupabaseClient<Database>()

  /**
   * Get user addresses
   */
  const getUserAddresses = async (userId: string) => {
    const { data, error } = await supabase
      .from('address')
      .select('*')
      .eq('user_id', userId)
    
    return { data, error }
  }

  /**
   * Get primary address for user
   */
  const getUserPrimaryAddress = async (userId: string) => {
    const { data, error } = await supabase
      .from('address')
      .select('*')
      .eq('user_id', userId)
      .single()
    
    return { data, error }
  }

  /**
   * Create address
   */
  const createAddress = async (addressData: AddressInsert) => {
    const { data, error } = await supabase
      .from('address')
      .insert(addressData)
      .select()
      .single()
    
    return { data, error }
  }

  /**
   * Update address
   */
  const updateAddress = async (addressId: string, addressData: AddressUpdate) => {
    const { data, error } = await supabase
      .from('address')
      .update(addressData)
      .eq('id', addressId)
      .select()
      .single()
    
    return { data, error }
  }

  /**
   * Delete address
   */
  const deleteAddress = async (addressId: string) => {
    const { data, error } = await supabase
      .from('address')
      .delete()
      .eq('id', addressId)
      .select()
    
    return { data, error }
  }

  return {
    getUserAddresses,
    getUserPrimaryAddress,
    createAddress,
    updateAddress,
    deleteAddress
  }
}