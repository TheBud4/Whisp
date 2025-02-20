import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const contacts = [
  { id: "1", name: "João Silva", phone: "(11) 98765-4321" },
  { id: "2", name: "Maria Oliveira", phone: "(21) 92345-6789" },
  { id: "3", name: "Carlos Santos", phone: "(31) 99876-5432" },
  { id: "4", name: "Ana Souza", phone: "(41) 91234-5678" },
];

const ContactsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
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
