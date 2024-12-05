import { supabase } from "../../supabase";
import { User } from "../models/User";

export class UserService {
  // Registro de usuário
  static async register(email: string, password: string): Promise<User | null> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Erro no registro:", error.message);
      return null;
    }

    return data.user;
  }

  // Login de usuário
  static async login(email: string, password: string): Promise<User | null> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Erro no login:", error.message);
      return null;
    }

    return data.user;
  }

  // Logout do usuário
  static async logout(): Promise<boolean> {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Erro no logout:", error.message);
      return false;
    }

    return true;
  }

  // Obter o usuário atual
  static async getCurrentUser(): Promise<User | null> {
    const { data } = await supabase.auth.getUser();

    return data.user || null;
  }

  // Atualizar dados do usuário
  static async updateUserProfile(updates: Partial<User>): Promise<User | null> {
    const { data, error } = await supabase.auth.updateUser(updates);

    if (error) {
      console.error("Erro ao atualizar perfil:", error.message);
      return null;
    }

    return data.user;
  }
}
