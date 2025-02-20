import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { UserService } from "src/services/UserService";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../@types/navigationTypes";
import styles from "./style";
import Icon from "react-native-vector-icons/MaterialIcons";

type RouteProps = RouteProp<RootStackParamList, "SecondStepLoginScreen">;

type ScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  "SecondStepLoginScreen"
>;

const SecondStepLoginScreen: React.FC = () => {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<ScreenProps>();
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { email } = route.params;

  const handleLogin = async () => {
    try {
      const loginResult = await UserService.login(email, password);
      if (!loginResult) return;
      navigation.navigate("HomeScreen",{userId: loginResult.userId});
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Icon
            name={showPassword ? "visibility" : "visibility-off"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.botoes}>
        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
};

export default SecondStepLoginScreen;
