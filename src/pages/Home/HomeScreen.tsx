import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "src/styles/main";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen: React.FC = () => {
  
  return (
    <View style={styles.container}>
      {/*Conteudo Principal*/}
      <View style={styles.content}>
        <Text style={styles.placeholderText}>
          Aqui onde vai ficar o conteudo Principal
        </Text>
      </View>

      {/*BOTÕES FLUTUATES*/}

      <View style={styles.floatingButtons}>
        <TouchableOpacity style={styles.button}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={24}
            color="#00000"
          />
          <Text style={styles.buttonLabel}>Conversas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Ionicons name="people-outline" size={24} color="#000000" />
          <Text style={styles.buttonLabel}>Contatos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Ionicons name="people-circle-outline" size={24} color="#000000" />
          <Text style={styles.buttonLabel}>Grupos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
