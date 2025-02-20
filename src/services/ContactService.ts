import { User } from "@/models/User";
import { supabase } from "../../supabase";

export class ContactService {
  static async getContactsByUserId(userId: string) {
    try {
      const { data, error } = await supabase
        .from("contacts")
        .select(
          "contact_id, users:users!contacts_contact_id_fkey(id, username, email)"
        )
        .eq("user_id", userId);

      if (error) {
        console.error("Erro ao buscar contatos:", error);
        return [];
      }

      return data.map((contact) => {
        const user = contact.users as User;
        return {
          id: contact.contact_id,
          username: user?.username ?? "Nome desconhecido",
          email: user?.email ?? "Email desconhecido",
        };
      });
      
    } catch (error) {
      console.error("Erro inesperado ao buscar contatos:", error);
      return [];
    }
  }

  static async saveContact(userId: string, email: string) {
    try {
      const { data: contactUser, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .single();

      if (userError || !contactUser) {
        return { error: "Contato não existe" };
      }

      const contactId = contactUser.id;

      const { data: existingContact, error: contactError } = await supabase
        .from("contacts") 
        .select("*")
        .eq("user_id", userId)
        .eq("contact_id", contactId)
        .single();

      if (existingContact) {
        return { message: "Contato já adicionado" };
      }

      const { error: insertError } = await supabase
        .from("contacts")
        .insert([{ user_id: userId, contact_id: contactId }]);

      if (insertError) {
        return { error: "Erro ao adicionar contato" };
      }
      if(userId === contactId){
        return { error: "Você não pode adicionar a si mesmo" };
      }
      return { message: "Contato adicionado" };
    } catch (error) {
      console.error("Erro inesperado:", error);
      return { error: "Erro inesperado ao adicionar contato" };
    }
  }
}
