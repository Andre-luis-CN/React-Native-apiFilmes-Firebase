import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from '../../assets/img/img-fundo.jpeg';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
    const navigation = useNavigation();

    return (
        <ImageBackground source={logo} style={styles.imglogo}>
            <SafeAreaView style={styles.container}>
                <View style={styles.containerButton}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Films')}><Text style={styles.textButton}>Catalogo de Filmes</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}><Text style={styles.textButton}>Sair</Text></TouchableOpacity>
                </View>
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
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
    },
    containerButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 30,
    },
    button: {
        marginTop: 180,
        height: 60,
        backgroundColor: '#ff2020',
        borderRadius: 10,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 20,
        shadowOpacity: 20,
        shadowColor: '#ccc',
    },
    textButton: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
});