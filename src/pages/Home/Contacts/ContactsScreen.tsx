import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../../@types/navigationTypes";
import { ContactService } from "@/services/ContactService";
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
    { id: string; username: string; email:string}[]
  >([]);

useEffect(() => {
  const fetchContacts = async () => {
    try {
      const userContacts = await ContactService.getContactsByUserId(userId);
      setContacts(userContacts);
    } catch (error) {
      console.error("Erro ao buscar contatos:", error);
    }
  };

  fetchContacts();
}, [userId]);


  return (
    <View style={styles.container}>
      {contacts.length === 0 && <Text>Nenhum contato encontrado</Text>}
      <FlatList
        data={contacts}
        keyExtractor={(contact) => contact.id}
        renderItem={(contact) => (
          <View style={styles.contactItem}>
            <Text style={styles.name}>{contact.item.username || "Sem nome"}</Text>
            <Text style={styles.phone}>{contact.item.email || "Sem email"}</Text>
          </View>
        )}
      />

      {/* Botão flutuante */}
      <TouchableOpacity style={styles.fab} onPress={() => {
        navigation.navigate("AddContactScreen", { userId });
      }}>
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
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  phone: {
    fontSize: 16,
    color: "gray",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#007AFF", // Cor do botão
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Sombra no Android
    shadowColor: "#000", // Sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default ContactsScreen;
