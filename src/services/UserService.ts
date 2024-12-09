import { supabase } from "../../supabase";
import { User } from "../models/User";

export class UserService {
  // Registro de usuário
  static async register(
    email: string,
    password: string,
    username?: string
  ): Promise<User | null> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Erro no registro:", error.message);
      return null;
    }

    if (data.user) {
      return new User(
        data.user.id,
        email,
        password,
        username,
        undefined, 
        new Date() 
      );
    }

    return null;
  }


  /* 
  TODO: Implementar um geramento de token para o usuário
  */

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

    if (data.user) {
     
      return new User(
        data.user.id,
        email,
        password, // A senha geralmente não é retornada após login
        undefined, // Username
        undefined, // avatarUrl
        new Date(data.user.created_at) 
      );
    }

    return null;
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
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error("Erro ao obter usuário atual:", error.message);
      return null;
    }

    if (data.user) {
      
      return new User(
        data.user.id,
        data.user.email ?? "",
        "", // Senha não é retornada
        undefined, // username não está disponível neste momento
        undefined, // avatarUrl não está disponível neste momento
        new Date(data.user.created_at) // Usa a data de criação retornada
      );
    }

    return null;
  }

  // Atualizar dados do usuário
  static async updateUserProfile(updates: Partial<User>): Promise<User | null> {
    const { data, error } = await supabase.auth.updateUser(updates);

    if (error) {
      console.error("Erro ao atualizar perfil:", error.message);
      return null;
    }

    if (data.user) {
      return new User(
        data.user.id,
        data.user.email ?? "",
        "", // Senha não é retornada
        updates.username, // Atualização opcional de username
        updates.avatarUrl, // Atualização opcional de avatarUrl
        new Date(data.user.created_at) // Usa a data de criação retornada
      );
    }

    return null;
  }
}
