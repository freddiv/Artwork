import type { Database, Tables, TablesInsert, TablesUpdate } from '~/types/database.types'

// Type aliases for users
export type User = Tables<'users'>
export type UserInsert = TablesInsert<'users'>
export type UserUpdate = TablesUpdate<'users'>

/**
 * User database operations
 */
export const useUsers = () => {
  const supabase = useSupabaseClient<Database>()

  /**
   * Get user by ID
   */
  const getUser = async (id: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()
    
    return { data, error }
  }

  /**
   * Get user by email
   */
  const getUserByEmail = async (email: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()
    
    return { data, error }
  }

  /**
   * Create new user
   */
  const createUser = async (userData: UserInsert) => {
    const { data, error } = await supabase
      .from('users')
      .insert(userData)
      .select()
      .single()
    
    return { data, error }
  }

  /**
   * Update user
   */
  const updateUser = async (id: string, userData: UserUpdate) => {
    const { data, error } = await supabase
      .from('users')
      .update(userData)
      .eq('id', id)
      .select()
      .single()
    
    return { data, error }
  }

  /**
   * Delete user (soft delete by setting inactive)
   */
  const deleteUser = async (id: string) => {
    const { data, error } = await supabase
      .from('users')
      .update({ is_admin: false }) // or add an 'active' field
      .eq('id', id)
      .select()
      .single()
    
    return { data, error }
  }

  return {
    getUser,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
  }
}