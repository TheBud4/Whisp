import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importação das telas
import OnboardingScreen from "../pages/Onboarding/OnBoardingScreen";
import HomeScreen from "../pages/Home/HomeScreen";
import FirstStepLoginScreen from "../pages/TwoStepLogin/FirstStepLoginScreen";
import SecondStepLoginScreen from "../pages/TwoStepLogin/SecondStepLoginScreen";
import RegistrationScreen from "../pages/Registration/RegistrationScreen";

const Stack = createNativeStackNavigator();

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
          options={{ headerShown: false }}
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
