import { supabase } from "../../supabase";

export default class ConversationService {
  static async getUserConversations(userId: string) {
    if (!userId) {
      throw new Error("O ID do usuário é obrigatório.");
    }

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

    const { data, error } = await supabase
      .from("conversations")
      .select(
        `
      id,
      name,
      last_message_id,
      created_at,
      last_message:messages!conversations_last_message_id_fkey(content),
      conversation_members(user_id)
    `
      )
      .in(
        "id",
        conversationIds.map((c) => c.conversation_id)
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro ao buscar conversas:", error);
      throw error;
    }

    if (!data || data.length === 0) {
      console.error("Nenhuma conversa encontrada.");
      return [];
    }

    const userIds = conversationIds.map((c) => c.conversation_id);
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("id, username, email")
      .in("id", userIds);

    if (usersError) {
      console.error("Erro ao buscar os usuários:", usersError);
      throw usersError;
    }

    const { data: contacts, error: contactsError } = await supabase
      .from("contacts")
      .select("contact_id")
      .eq("user_id", userId);

    if (contactsError) {
      console.error("Erro ao buscar os contatos:", contactsError);
      throw contactsError;
    }

    const contactIds = contacts
      ? contacts.map((contact) => contact.contact_id)
      : [];

    const conversationsWithDetails = data.map((conversation) => {
      const usersInConversation = conversation.conversation_members
        .map((member) => {
          const user = users.find((u) => u.id === member.user_id);
          return user
            ? { user_id: user.id, username: user.username, email: user.email }
            : null;
        })
        .filter(Boolean);

      const usersInConversationWithContacts = usersInConversation
        .map((user) => {
          if (user) {
            return {
              ...user,
              is_contact: contactIds.includes(user.user_id),
            };
          }
          return null;
        })
        .filter(Boolean);

      return { ...conversation, users: usersInConversationWithContacts };
    });

    return conversationsWithDetails;
  }
}
