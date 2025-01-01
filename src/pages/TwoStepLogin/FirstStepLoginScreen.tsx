import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { RootStackParamList } from "../../../@types/navigationTypes";


type ScreenProps = StackNavigationProp<
  RootStackParamList,
  "FirstStepLoginScreen"
>;

const FirstStepLoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const navigation = useNavigation<ScreenProps>();

  const handleLogin = () => {
    navigation.navigate("SecondStepLoginScreen", { email });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <View style={styles.botoes}>
        <Button title="Continuar" onPress={handleLogin} />
        <Button
          title="Fazer Cadastro"
          onPress={() => navigation.navigate("RegistrationScreen")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 30,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  botoes: {
    padding: 50,
    gap: 10,
  },
});

export default FirstStepLoginScreen;
