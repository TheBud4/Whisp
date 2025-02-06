import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { User } from 'src/models/User';

//nada aqui ta funcionando ainda mas isso e parte do processo, favor nao criticar

type RootStackParamList = {
    Home: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const LoginScreen: React.FC = () => {
    const [newuser, setUser] = useState<User>();
    const [aux, setAux] = useState<string>('');

    //coisas que o usuario nao seta / coisas automaticas e tals
    newuser.id = Math.random();

    /*const handleLogin = async () => {
        try {
            console.log(newuser.email, newuser.password);
            await UserService.login(newuser.email, newuser.password);
        } catch (error) {
            console.error("Erro ao fazer login:", error);
        }
    };*/

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Informe seu e-mail"
                    value={aux}
                    onChangeText={setAux}
                    secureTextEntry
                    {newuser.email = aux}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Informe sua senha"
                    value={aux}
                    onChangeText={setAux}
                    secureTextEntry
                    {newuser.password = aux}
                />
                do{<TextInput
                    style={styles.input}
                    placeholder="Confirme sua senha"
                    value={aux}
                    onChangeText={setAux}
                    secureTextEntry
                />}while(aux != newuser.password)

                <TextInput
                    style={styles.input}
                    placeholder="Informe seu nome de usuario"
                    value={aux}
                    onChangeText={setAux}
                    secureTextEntry
                    {newuser.username = aux}
                />

                <View style={styles.botoes}>
                <Button title="Criar Conta" onPress={handleLogin} />
                   
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    botoes:{
        padding: 50,
        gap: 10,
        
    },
    botao:{
    },
});

export default LoginScreen;