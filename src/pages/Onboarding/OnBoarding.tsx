import { Image, StyleSheet } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
  Home: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const OnBoarding: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <Onboarding
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <Image
              style={styles.image}
              source={require("../../../assets/icon.png")}
            />
          ),
          title: "Onboarding",
          subtitle: "Done with React Native Onboarding Swiper",
        },
        {
          backgroundColor: "#fe6e58",
          image: (
            <Image
              style={styles.image}
              source={require("../../../assets/icon.png")}
            />
          ),
          title: "The Title",
          subtitle: "This is the subtitle that sumplements the title.",
        },
      ]}
      onDone={() => navigation.navigate("Home")}
      onSkip={() => navigation.navigate("Home")}
    />
  );
};

export const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
});

export default OnBoarding;
