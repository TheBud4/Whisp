import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

type RootStackParamList = {
    LoginSenha: undefined;
};

  type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "LoginSenha">;


const LoginScreen: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const navigation = useNavigation<HomeScreenNavigationProp>();


    const handleLogin = () => {
        // Lógica de login aqui
        console.log('Email:', email);
        navigation.navigate("LoginSenha")
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
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 30,
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
});

export default LoginScreen;
