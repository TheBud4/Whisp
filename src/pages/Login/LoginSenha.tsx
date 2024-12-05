import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

type RootStackParamList = {
    Home: undefined;
  };
  
  type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;


const LoginScreen: React.FC = () => {
    const [password, setPassword] = useState<string>('');
    const navigation = useNavigation<HomeScreenNavigationProp>();
;


    function handleLogin() {
        console.log('Password:', password);
        navigation.navigate("Home");
    
  


    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Informe sua senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <View style={styles.botoes}>
            <Button title="Login" onPress={handleLogin} />

            <Button title="Criar conta" onPress={handleLogin}/>
            </View>
        </View>
    );
};

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
        borderRadius: 20,
       
       
    }
});

export default LoginScreen;
