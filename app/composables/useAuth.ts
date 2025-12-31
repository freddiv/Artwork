export function useAuth() {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  const error = ref(null);

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
    
    // Only create user record after email confirmation (handled by trigger or manual process)
    // Don't create record immediately as user might not confirm email
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  return { user, error, signInWithEmail, signUpWithEmail, signOut };
}
