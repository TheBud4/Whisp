import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import styles from "./style";
import { RootStackParamList } from "../../../@types/navigationTypes";
import Icon from "react-native-vector-icons/MaterialIcons";
import { UserService } from "@/services/UserService";
import { User } from "@/models/User";

type ScreenProps = StackNavigationProp<
  RootStackParamList,
  "RegistrationScreen"
>;

const RegistrationScreen: React.FC = () => {
  const navigation = useNavigation<ScreenProps>();

  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleRegistration = async () => {
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    const user: User = {
      email,
      username: userName,
      password,
    };
    try {
      const register = await UserService.register(user);
      
      if (!register) return;
      
      navigation.navigate("FirstStepLoginScreen");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      {/* Nome de Usuário */}
      <TextInput
        style={styles.input}
        placeholder="Nome de Usuário"
        value={userName}
        onChangeText={setUserName}
        keyboardType="default"
        autoCapitalize="none"
      />

      {/* Email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <View style={styles.passwordContainer}>
        {/* Senha */}
        <View style={styles.password}>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? "visibility" : "visibility-off"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        {/* Confirmar Senha */}
        <View style={styles.password}>
          <TextInput
            style={styles.input}
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Icon
              name={showConfirmPassword ? "visibility" : "visibility-off"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* Botão de Cadastro */}
      <View style={styles.botoes}>
        <Button title="Cadastrar" onPress={handleRegistration} />
      </View>
    </View>
  );
};

export default RegistrationScreen;
