import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { UserService } from "src/services/UserService";
import { StackNavigationProp } from "@react-navigation/stack";

type LoginSenhaRouteProp = RouteProp<RootStackParamList, "LoginSenha">;

type RootStackParamList = {
  Home: {userKey: string};
  LoginSenha: { email: string };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "LoginSenha">;



const LoginSenhaScreen: React.FC = () => {
  const route = useRoute<LoginSenhaRouteProp>();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [password, setPassword] = useState<string>("");
  const { email } = route.params;

  const handleLogin = async () => {
    try {
      console.log(email, password);
      const loginResult = await UserService.login(email, password);
        if(!loginResult)
            return;
        
      navigation.navigate("Home", { userKey: loginResult });
        
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

export default LoginSenhaScreen;
