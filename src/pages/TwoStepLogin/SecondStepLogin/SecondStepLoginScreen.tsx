import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { UserService } from "src/services/UserService";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../@types/navigationTypes";
import styles from "./style";

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
      const loginResult = await UserService.login(email, password);
      if (!loginResult) return;
      navigation.navigate("HomeScreen");
    } catch (error) {
      alert(error);
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

export default SecondStepLoginScreen;
