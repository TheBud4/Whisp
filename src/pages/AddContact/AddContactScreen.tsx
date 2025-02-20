import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ContactService } from "@/services/ContactService";
import { RootStackParamList } from "../../../@types/navigationTypes";

type RouteProps = RouteProp<RootStackParamList, "AddContactScreen">;

const AddContactScreen: React.FC = () => {
  const route = useRoute<RouteProps>();
  const { userId } = route.params;
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  const handleSaveContact = async () => {
    if (!email.trim()) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
    try {
      const saveResult = await ContactService.saveContact(userId, email);
      if (saveResult.error) {
        Alert.alert("Erro", saveResult.error);
        return;
      }
      Alert.alert("Sucesso", saveResult.message, [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Erro ao adicionar contato");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Contato</Text>

      {/* Campo para o nome */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      {/* Botão de salvar */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveContact}>
        <Text style={styles.saveButtonText}>Salvar</Text>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AddContactScreen;
