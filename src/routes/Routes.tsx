import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

// Importação das telas
import OnboardingScreen from "../pages/Onboarding/OnBoardingScreen";
import HomeScreen from "../pages/Home/HomeScreen";
import FirstStepLoginScreen from "../pages/TwoStepLogin/FirstStepLogin/FirstStepLoginScreen";
import SecondStepLoginScreen from "../pages/TwoStepLogin/SecondStepLogin/SecondStepLoginScreen";
import RegistrationScreen from "../pages/Registration/RegistrationScreen";
import ProfileScreen from "@/pages/Profile/ProfileScreen";
import { RootStackParamList } from "../../@types/navigationTypes";

// Criação do componente de navegação
const Stack = createNativeStackNavigator<RootStackParamList>();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnboardingScreen">
        <Stack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={({ route, navigation }) => {
            const userId = route?.params?.userId ?? "default_user_id"; 
            return {
              headerTitle: "Whisp",
              headerBackVisible: false,
              headerRight: () => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ProfileScreen", { userId })
                  }
                >
                  <Ionicons name="settings-outline" size={24} color="black" />
                </TouchableOpacity>
              ),
            };
          }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ headerTitle: "Perfil" }}
        />
        <Stack.Screen
          name="FirstStepLoginScreen"
          component={FirstStepLoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SecondStepLoginScreen"
          component={SecondStepLoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
