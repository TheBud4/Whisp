import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../../@types/navigationTypes";
import { ContactService } from "@/services/ContactService";

type ContactsScreenRouteProp = RouteProp<RootStackParamList, "ContactsScreen">;

const ContactsScreen: React.FC = () => {
  const route = useRoute<ContactsScreenRouteProp>();
  const { userId } = route.params;
  const [contacts, setContacts] = useState<
    { id: string; name: string; phone: string }[]
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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.contactItem}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.phone}>{item.phone}</Text>
          </View>
        )}
      />
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
});

export default ContactsScreen;
