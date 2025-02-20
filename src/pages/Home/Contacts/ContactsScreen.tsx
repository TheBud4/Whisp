import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../../@types/navigationTypes";
import { ContactService } from "@/services/ContactService";
import { MessageService } from "@/services/MessageService";  
import Icon from "react-native-vector-icons/MaterialIcons";

type ContactsScreenRouteProp = RouteProp<RootStackParamList, "ContactsScreen">;
type ScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  "ContactsScreen"
>;

const ContactsScreen: React.FC = () => {
  const route = useRoute<ContactsScreenRouteProp>();
  const navigation = useNavigation<ScreenProps>();
  const { userId } = route.params;
  const [contacts, setContacts] = useState<
    { id: string; username: string; email: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const userContacts = await ContactService.getContactsByUserId(userId);
        setContacts(userContacts);
      } catch (error) {
        console.error("Erro ao buscar contatos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [userId]);

  const startConversation = async (contactId: string, contactName: string) => {
    try {
      const conversationId = await MessageService.getOrCreateConversation(
        userId,
        contactId
      );

      if (conversationId) {
        navigation.navigate("ChatScreen", {
          userId: userId,
          contactId: contactId,
          contactName: contactName,
          conversationId: conversationId,
        });
      }
    } catch (error) {
      console.error("Erro ao iniciar conversa:", error);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : contacts.length === 0 ? (
        <Text>Nenhum contato encontrado</Text>
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={(contact) => contact.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.contactItem}
              onPress={() => startConversation(item.id, item.username)}
            >
              <Text style={styles.name}>{item.username || "Sem nome"}</Text>
              <Text style={styles.email}>{item.email || "Sem email"}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Botão flutuante para adicionar contatos */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          navigation.navigate("AddContactScreen", { userId });
        }}
      >
        <Icon name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  contactItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    color: "gray",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#007AFF",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default ContactsScreen;
