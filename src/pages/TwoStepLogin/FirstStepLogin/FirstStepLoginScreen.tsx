import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { RootStackParamList } from "../../../../@types/navigationTypes";
import styles from "./style";

type ScreenProps = NativeStackNavigationProp<
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

export default FirstStepLoginScreen;
