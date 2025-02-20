import { supabase } from "../../supabase";
import { User } from "../models/User";

export class UserService {
  // Cadastro de usuario
  static async register(user: User): Promise<boolean> {
    const { username, email, password } = user;

    if (!email || !password) {
      return false;
    }

    const { data, error } = await supabase
      .from("users")
      .select("email")
      .eq("email", email)
      .single();

    if (error && error.code !== "PGRST116") {
      throw "Erro ao verificar e-mail.";
    }

    if (data) {
      throw "Este e-mail já está registrado.";
    }

    // Validação de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw "Email inválido";
    }

    // Validação de senha
    if (password.length < 8) {
      throw "A senha precisa ter pelo menos 8 caracteres";
    }

    // Gera um nome de usuário padrão, se necessário
    const sanitizedUsername =
      username || "user_" + Math.random().toString(36).substring(2, 10);

    // Criação de perfil do usuário
    const { error: profileError } = await supabase.from("users").insert([
      {
        username: sanitizedUsername,
        email: email,
        password: password,
      },
    ]);

    if (profileError) {
      throw "Erro ao criar o perfil do usuário: " + profileError?.message;
    }

    return true;
  }

  // Login de usuário
  static async login(
    email: string,
    password: string
  ): Promise<{ userId: string }> {
    const { data, error } = await supabase
      .from("users")
      .select("email, password, id")
      .eq("email", email)
      .single();

    if (error) {
      throw "Email ou senha incorretos";
    }

    if (!data) {
      throw "Email incorreto";
    }

    if (password !== data.password) {
      throw "Senha incorreta";
    }

    // Se tudo estiver correto, retorna o id do usuário
    return { userId: data.id };
  }

  // Obter o usuário pelo ID
  static async getCurrentUser(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from("users")
      .select("*") 
      .eq("id", id) 
      .single(); 

    if (error) {
      console.error("Erro ao obter usuário atual:", error.message);
      return null;
    }

    if (data) {
      return new User(
        data.id,
        data.email ?? "",
        "",
        data.username ?? "Ainda não definido",
        undefined,
        new Date(data.created_at)
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
