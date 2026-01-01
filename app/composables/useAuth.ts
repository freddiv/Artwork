import { useUsers } from "@/composables/database/useUsers";
import type { TablesInsert } from "~/types/database.types";

export function useAuth() {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  const error = ref<any>(null);
  const { createUser, getUserByEmail } = useUsers();

  async function signInWithEmail(email: string, password: string) {
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    error.value = signInError;
  }

  async function signUpWithEmail(email: string, password: string, userData?: { name?: string, role?: string }) {
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/confirm`,
        data: {
          name: userData?.name || '',
          role: userData?.role || 'customer'
        }
      }
    });
    
    error.value = signUpError;
    
    // Create user profile record after successful signup
    if (data?.user && !signUpError) {
      const userProfile: TablesInsert<'users'> = {
        id: data.user.id,
        email: data.user.email!,
        name: userData?.name || '',
        user_role: userData?.role || 'customer',
        is_admin: false
      };
      
      // Try to create user profile (may fail if already exists due to triggers)
      await createUser(userProfile);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  /**
   * Get user profile data from database
   */
  async function getUserProfile(userId?: string) {
    const targetUserId = userId || user.value?.id;
    if (!targetUserId) return null;
    
    const { data, error: profileError } = await getUserByEmail(user.value?.email || '');
    if (profileError) {
      error.value = profileError;
      return null;
    }
    
    return data;
  }

  return { 
    user, 
    error, 
    signInWithEmail, 
    signUpWithEmail, 
    signOut, 
    getUserProfile 
  };
}
