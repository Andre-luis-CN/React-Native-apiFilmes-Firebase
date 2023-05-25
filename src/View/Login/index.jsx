import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from '../../assets/img/img-fundo.jpeg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../assets/auth/auth';

export default function Login() {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const app = initializeApp(firebaseConfig);

    const auth = getAuth(app)

    const clearInput = () => {
        setEmail("");
        setPassword("");
    }

    const Login = async () => {
        await signInWithEmailAndPassword(auth, email, password)
            .then((response) => {
                clearInput();
                navigation.navigate('Home')
            }).catch((error) => {
                switch (error.message) {
                    case 'Firebase: Error (auth/invalid-email).':
                        Alert.alert('Email inválido')
                        break;
                    case 'Firebase: Error (auth/wrong-password).':
                        Alert.alert('Email não cadastrado ou Senha incorreta')
                        break;
                    case 'Firebase: Error (auth/user-not-found).':
                        Alert.alert('Email não cadastrado ou Senha incorreta')
                        break;
                    default:
                        Alert.alert(error.message.toString())
                        break;
                }
            })
    }

    const Cadastro = async () => {
        await createUserWithEmailAndPassword(auth, email, password)
            .then((response) => {
                Alert.alert('Usuario criado com sucesso')
                clearInput();
                navigation.navigate('Home')
            }).catch((error) => {
                switch (error.message) {
                    case 'Firebase: Error (auth/invalid-email).':
                        Alert.alert('Email inválido')
                        break;
                    case 'Firebase: Error (auth/email-already-in-use).':
                        Alert.alert('Email ja cadastrado')
                        break;
                    case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
                        Alert.alert('A senha deve conter pelomenos de 6 caracteres')
                    default:
                        Alert.alert(error.message.toString())
                        break;
                }
            })
    }


    return (
        <ImageBackground source={logo} style={styles.imglogo}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.titleLogin} >Login/Cadastro</Text>

                <TextInput
                    value={email}
                    onChangeText={(e) => setEmail(e)}
                    placeholder='Email'
                    style={styles.textLogin} />
                <TextInput
                    secureTextEntry
                    value={password}
                    onChangeText={(e) => setPassword(e)}
                    placeholder='Senha'
                    style={styles.textLogin} />


                <TouchableOpacity style={styles.button} onPress={() => Login()}><Text style={styles.textButton}>Entrar</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => Cadastro()}><Text style={styles.textButton}>Cadastrar</Text></TouchableOpacity>

                <StatusBar style="auto" />
            </SafeAreaView>
        </ImageBackground>
    );
}




const styles = StyleSheet.create({
    imglogo: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    button: {
        height: 50,
        backgroundColor: '#ff2020',
        borderRadius: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 20,
        shadowOpacity: 20,
        shadowColor: '#ccc',
        marginBottom: 20,
    },
    textButton: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    textCadastro: {
        fontSize: 12,
        color: '#fff',
    },
    textLogin: {
        height: 50,
        width: 300,
        backgroundColor: '#ccc',
        borderRadius: 30,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    titleLogin: {
        fontSize: 30,
        color: '#fff',
        marginBottom: 20,
    }
});