import React from "react";
import { TouchableOpacity, View,Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "src/styles/main";

const FooterComponent = () => {
    return (
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
    );
}

export default FooterComponent;