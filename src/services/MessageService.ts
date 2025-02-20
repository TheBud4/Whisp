import { supabase } from "../../supabase";

export class MessageService {
  // Criar ou obter uma conversa privada entre dois usuários
  static async getOrCreateConversation(userId: string, contactId: string) {
    try {
      // Primeiro, busque as conversas em que o usuário está
      const { data: userConversations, error: userError } = await supabase
        .from("conversation_members")
        .select("conversation_id")
        .eq("user_id", userId);

      if (userError) throw userError;

      // Segundo, busque as conversas em que o contato está
      const { data: contactConversations, error: contactError } = await supabase
        .from("conversation_members")
        .select("conversation_id")
        .eq("user_id", contactId);

      if (contactError) throw contactError;

      // Extraia os IDs das conversas
      const userConversationIds = userConversations.map(
        (c) => c.conversation_id
      );
      const contactConversationIds = contactConversations.map(
        (c) => c.conversation_id
      );

      // Interseção das conversas (conversas que ambos participam)
      const commonConversationIds = userConversationIds.filter((id) =>
        contactConversationIds.includes(id)
      );

      if (commonConversationIds.length > 0) {
        // Pegamos a primeira conversa existente
        return commonConversationIds[0];
      }

      // Se não houver conversa existente, criamos uma nova
      const { data: newConversation, error: convError } = await supabase
        .from("conversations")
        .insert([{ is_group: false }])
        .select("id")
        .single();

      if (convError) throw convError;

      const conversationId = newConversation.id;

      // Adicionamos os usuários na nova conversa
      await supabase.from("conversation_members").insert([
        { conversation_id: conversationId, user_id: userId },
        { conversation_id: conversationId, user_id: contactId },
      ]);

      return conversationId;
    } catch (error) {
      console.error("Erro ao buscar/criar conversa:", error);
      return null;
    }
  }

  // Obter mensagens de uma conversa
  static async getMessages(conversationId: string) {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("id, sender_id, content, created_at")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Erro ao buscar mensagens:", error);
      return [];
    }
  }

  // Atualizar status da mensagem
  static async updateMessageStatus(
    messageId: string,
    userId: string,
    status: "delivered" | "read"
  ) {
    try {
      const { error } = await supabase.from("message_status").upsert(
        [{ message_id: messageId, user_id: userId, status }],
        { onConflict: "message_id, user_id" } // <-- Correção aqui
      );

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Erro ao atualizar status da mensagem:", error);
      return false;
    }
  }

  // Enviar mensagem em uma conversa
  static async sendMessage(
    conversationId: string,
    userId: string,
    content: string,
    fileUrl?: string
  ) {
    try {
      // Inserir mensagem na tabela "messages"
      const { data: newMessage, error: messageError } = await supabase
        .from("messages")
        .insert([
          {
            conversation_id: conversationId,
            sender_id: userId,
            content,
            file_url: fileUrl || null, // Se houver URL de arquivo, usa; caso contrário, usa null
          },
        ])
        .select("id, sender_id, content, created_at")
        .single();

      if (messageError) throw messageError;

      // Inserir status da mensagem (status "sent" para todos os membros da conversa)
      const { data: members, error: membersError } = await supabase
        .from("conversation_members")
        .select("user_id")
        .eq("conversation_id", conversationId);

      if (membersError) throw membersError;

      // Criar registros de status da mensagem para cada membro
      const statusPromises = members.map(
        async (member: { user_id: string }) => {
          const { error: statusError } = await supabase
            .from("message_status")
            .upsert(
              {
                message_id: newMessage.id,
                user_id: member.user_id,
                status: "sent", // O status inicial da mensagem
              },
              { onConflict: "message_id,user_id" } // Corrigido: concatenando as colunas
            );
          if (statusError) throw statusError;
        }
      );

      // Espera todas as inserções de status de mensagem serem realizadas
      await Promise.all(statusPromises);

      return newMessage; // Retorna a mensagem recém-criada
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      return null; // Retorna null caso haja erro
    }
  }
}
