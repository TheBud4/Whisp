import React from "react";
import { Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Escolha o pacote de ícones que preferir
import Onboarding from "react-native-onboarding-swiper";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
  Login: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
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

const OnBoarding: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

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
      onDone={() => navigation.navigate("Login")}
      onSkip={() => navigation.navigate("Login")}
      NextButtonComponent={NextButton}
      SkipButtonComponent={SkipButton}
      DoneButtonComponent={DoneButton}
      bottomBarHighlight={false}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
  buttonBase: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "blue",
    marginHorizontal: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
  },
  icon: {
    marginRight: 5,
  },
  botaoproximo: {
    backgroundColor: "blue",
  },
  botaopular: {
    backgroundColor: "gray",
  },
  botaoPronto: {
    backgroundColor: "green",
  },
});

export default OnBoarding;
