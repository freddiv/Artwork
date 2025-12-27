export function useAuth() {
  const supabase = useSupabaseClient();
  const error = ref(null);

  async function signInWithEmail(email: string, password: string) {
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    error.value = signInError;
  }

  async function signUpWithEmail(email: string, password: string) {
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });
    error.value = signUpError;
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  return { user, error, signInWithEmail, signUpWithEmail, signOut };
}
