import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../@types/navigationTypes";
import ConversationService from "@/services/ConversationService";
import Icon from "react-native-vector-icons/MaterialIcons";

type ScreenProps = NativeStackNavigationProp<RootStackParamList, "ChatsScreen">;
type HomeScreenRouteProp = RouteProp<RootStackParamList, "HomeScreen">;

const ChatsScreen: React.FC = () => {
  const navigation = useNavigation<ScreenProps>();
  const route = useRoute<HomeScreenRouteProp>();
  const { userId } = route.params;

  const [conversations, setConversations] = useState<
    { id: string; contactName: string; contactId: string }[]
  >([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const fetchedConversations =
          await ConversationService.getUserConversations(userId);

        // Convertendo os dados para o formato correto
        const mappedConversations = fetchedConversations.map((conv: any) => {
          // Aqui verificamos se a propriedade 'participants' está disponível
          const otherParticipant = conv.participants?.find(
            (p: any) => p.id !== userId
          ); // Pegando o outro usuário da conversa

          return {
            id: conv.id,
            contactName: otherParticipant?.name || "Desconhecido",
            contactId: otherParticipant?.id || "",
          };
        });

        setConversations(mappedConversations);
      } catch (error) {
        console.error("Erro ao carregar conversas:", error);
      }
    };

    fetchConversations();
  }, [userId]);

  const openChat = (
    conversationId: string,
    contactId: string,
    contactName: string
  ) => {
    navigation.navigate("ChatScreen", {
      userId: userId,
      contactId,
      contactName,
      conversationId,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversas</Text>
      {conversations.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma conversa encontrada.</Text>
      ) : (
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.conversationItem}
              onPress={() =>
                openChat(item.id, item.contactId, item.contactName)
              }
            >
              <Icon name="chat" size={24} color="#007AFF" style={styles.icon} />
              <Text style={styles.conversationText}>{item.contactName}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  conversationItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  icon: {
    marginRight: 12,
  },
  conversationText: {
    fontSize: 18,
  },
});

export default ChatsScreen;
