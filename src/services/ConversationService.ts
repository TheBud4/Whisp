import { supabase } from "../../supabase";

export default class ConversationService {
  
  static async getUserConversations(userId: string) {
    if (!userId) {
      throw new Error("O ID do usuário é obrigatório.");
    }

    // Primeiro, buscamos os conversation_ids da tabela conversation_members
    const { data: conversationIds, error: conversationIdsError } =
      await supabase
        .from("conversation_members")
        .select("conversation_id")
        .eq("user_id", userId);

    if (conversationIdsError) {
      console.error(
        "Erro ao buscar os IDs das conversas:",
        conversationIdsError
      );
      throw conversationIdsError;
    }

    
    if (!conversationIds || conversationIds.length === 0) {
      console.error("Nenhuma conversa encontrada para o usuário.");
      return []; 
    }

    console.log("IDs das conversas encontradas:", conversationIds);

    // Agora usamos os IDs para buscar as conversas
    const { data, error } = await supabase
      .from("conversations")
      .select(
        `
        id,
        last_message_id,
        created_at,
        last_message:messages!conversations_last_message_id_fkey(content)
      `
      )
      .in(
        "id",
        conversationIds.map((c) => c.conversation_id)
      ) // Passando os IDs das conversas
      .order("created_at", { ascending: false });

    // Verificação para garantir que `data` não está undefined
    if (error) {
      console.error("Erro ao buscar conversas:", error);
      throw error;
    }

    if (!data || data.length === 0) {
      console.error("Nenhuma conversa encontrada.");
      return []; // Retorna um array vazio caso não haja dados
    }

    console.log("Conversas encontradas:", data);

    return data;
  }
}
