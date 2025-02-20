import { supabase } from "../../supabase";

export class ContactService {
  static async getContactsByUserId(userId: string) {
    try {
      const { data, error } = await supabase
        .from("contacts") 
        .select("*")
        .eq("user_id", userId); 

      if (error) {
        console.error("Erro ao buscar contatos:", error);
        return [];
      }

      return data;
    } catch (error) {
      console.error("Erro inesperado ao buscar contatos:", error);
      return [];
    }
  }
}
