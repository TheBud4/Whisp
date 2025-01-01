import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { UserService } from "src/services/UserService";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../@types/navigationTypes";

type RouteProps = RouteProp<RootStackParamList, "SecondStepLoginScreen">;

type ScreenProps = StackNavigationProp<
  RootStackParamList,
  "SecondStepLoginScreen"
>;

const SecondStepLoginScreen: React.FC = () => {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<ScreenProps>();
  const [password, setPassword] = useState<string>("");
  const { email } = route.params;

  const handleLogin = async () => {
    try {
      console.log(email, password);
      const loginResult = await UserService.login(email, password);
      if (!loginResult) return;

      navigation.navigate("HomeScreen");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Informe sua senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.botoes}>
        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
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
  botao: {},
});

export default SecondStepLoginScreen;
