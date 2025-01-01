import { Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Onboarding from "react-native-onboarding-swiper";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../@types/navigationTypes";
import styles from "./style";

type ScreenProps = StackNavigationProp<
  RootStackParamList,
  "OnboardingScreen"
>;

const CustomButton = ({
  title,
  onPress,
  style,
  iconName,
}: {
  title: string;
  onPress: () => void;
  style: any;
  iconName?: string;
}) => (
  <TouchableOpacity onPress={onPress} style={[styles.buttonBase, style]}>
    {iconName && (
      <Icon name={iconName} size={20} color="white" style={styles.icon} />
    )}
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const NextButton = (props: any) => (
  <CustomButton
    title="Próximo"
    onPress={props.onPress}
    style={styles.botaoproximo}
    iconName="arrow-forward"
  />
);

const SkipButton = (props: any) => (
  <CustomButton
    title="Pular"
    onPress={props.onPress}
    style={styles.botaopular}
    iconName="skip-next"
  />
);

const DoneButton = (props: any) => (
  <CustomButton
    title="Pronto"
    onPress={props.onPress}
    style={styles.botaoPronto}
    iconName="check"
  />
);

const OnBoardingScreen: React.FC = () => {
  const navigation = useNavigation<ScreenProps>();

  return (
    <Onboarding
      pages={[
        {
          backgroundColor: "#DBFFD9",
          image: (
            <Image
              style={styles.image}
              source={require("../../../assets/foto-onboarding1.png")}
            />
          ),
          title: "Bem Vindo ao Whisp!",
          subtitle: "Seu aplicativo de mensagens favorito.",
        },
        {
          backgroundColor: "#B0D6E0",
          image: (
            <Image
              style={styles.image}
              source={require("../../../assets/foto-onboarding2.png")}
            />
          ),
          title: "Conecte-se com pessoas do mundo todo!",
          subtitle: "Converse com amigos e familiares.",
        },
        {
          backgroundColor: "#C5BBE9",
          image: (
            <Image
              style={styles.image}
              source={require("../../../assets/foto-onboarding3.png")}
            />
          ),
          title: "Tenha uma experiência incrível!",
          subtitle: "Se comunicar nunca foi tão fácil.",
        },
      ]}
      onDone={() => navigation.navigate("FirstStepLoginScreen")}
      onSkip={() => navigation.navigate("FirstStepLoginScreen")}
      NextButtonComponent={NextButton}
      SkipButtonComponent={SkipButton}
      DoneButtonComponent={DoneButton}
      bottomBarHighlight={false}
    />
  );
};
export default OnBoardingScreen;
