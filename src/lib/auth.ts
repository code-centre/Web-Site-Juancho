import { supabase } from './supabaseClient';

// Registro de nuevos usuarios
export const signUp = async (email: string, pass: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password: pass,
    options: {
      // Estos datos se guardarán en raw_user_meta_data y 
      // nuestro Trigger de SQL los pasará a la tabla 'profiles'
      data: {
        full_name: fullName,
      },
    },
  });
  return { data, error };
};

// Inicio de sesión
export const signIn = async (email: string, pass: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: pass,
  });
  return { data, error };
};

// Cerrar sesión
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};