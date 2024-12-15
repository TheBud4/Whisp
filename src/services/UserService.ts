import { supabase } from "../../supabase";
import { User } from "../models/User";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Home: { email: string };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const navigateHome = (userEmail: string) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  navigation.navigate("Home", { email: userEmail });
};


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
    
    console.log(email, password );

      navigateHome(email);

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
