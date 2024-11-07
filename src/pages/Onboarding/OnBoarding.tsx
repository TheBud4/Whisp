import { Button, Image, StyleSheet } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
    Home: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const NextButton = ({ ...props}:any) => {
    return <Button title="Próximo" {...props} />;
}
const SkipButton = ({ ...props}:any) => {
    return <Button title="Pular" {...props} />;
}
const DoneButton = ({ ...props}:any) => {
    return <Button title="Pronto" {...props} />;
}



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
        onDone={() => navigation.navigate("Home")}
        onSkip={() => navigation.navigate("Home")}
        bottomBarColor="none"
        NextButtonComponent={NextButton}
        SkipButtonComponent={DoneButton}
        DoneButtonComponent={DoneButton}
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
