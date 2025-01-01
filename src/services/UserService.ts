import { supabase } from "../../supabase";
import { User } from "../models/User";

export class UserService {
  
  // Registro de usuário

  static async register(
    email: string,
    password: string,
    username?: string
  ): Promise<boolean> {
    // Verifique se o email é válido
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Email inválido");
    }

    // Verifique se a senha tem pelo menos 8 caracteres
    if (password.length < 8) {
      throw new Error("A senha precisa ter pelo menos 8 caracteres");
    }

    // Registre o usuário com email e senha no Supabase
    const { data: signUpData, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    // Criação de um perfil do usuário (nome de usuário e avatar)
    const { data: profileData, error: profileError } = await supabase
      .from("users") // Certifique-se de que sua tabela de usuários está configurada corretamente
      .insert([
        {
          username,
          email,
          avatar_url: "", // ou qualquer URL de avatar padrão
          id: signUpData.user?.id,
        },
      ]);

    if (profileError) {
      throw new Error(profileError.message);
    }

    return true;
  }

  // Login de usuário
  static async login(email: string, password: string): Promise<string | null> {
    return "userkey";

    // const { data, error } = await supabase.auth.signInWithPassword({
    //   email,
    //   password,
    // });

    // if (error) {
    //   console.error("Erro no login:", error.message);
    //   return null;
    // }

    // if (data.user) {
    //   console.log("Passou 2");
    //   navigateHome(email);
    // }
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
        "",
        undefined,
        undefined,
        new Date(data.user.created_at)
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
        "",
        updates.username,
        updates.avatarUrl,
        new Date(data.user.created_at)
      );
    }

    return null;
  }
}
