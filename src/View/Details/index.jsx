import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import logo from '../../assets/img/img-fundo.jpeg';
import { getDatails, key } from '../../assets/api/req';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function Details({ route }) {
    const navigation = useNavigation();

    const [value, setValue] = useState(route.params.text)
    const [details, setDetails] = useState([]);

    async function openDatails() {
        var result = await getDatails.get(`${value}?api_key=${key}&language=pt-BR`);
        setDetails(result.data);
    }

    useEffect(() => {
        openDatails()
    }, [])


    return (
        <ImageBackground source={logo} style={styles.imglogo}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>{details.title}</Text>
                <Image style={styles.image} source={{ uri: `https://image.tmdb.org/t/p/w500/${details.poster_path}` }} />
                <Text style={styles.sinopse}>SINOPSE: {details.overview} </Text>
                <Text style={styles.lancamento}>LANÇAMENTO: {details.release_date}</Text>
                <Text style={styles.nota}>NOTA: {details.vote_average}</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Films')}><Text style={styles.textButton}>Voltar para lista</Text></TouchableOpacity>
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
        backgroundColor: 'rgba(0,0,0,0.8)',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 40,
    },
    title: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
    },
    sinopse: {
        color: '#fff',
        paddingHorizontal: 30,
    },
    lancamento: {
        color: '#fff',
    },
    nota: {
        color: '#fff',
        fontWeight: 'bold',
    },
    image: {
        width: 150,
        height: 200,
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
        fontSize: 20,
        fontWeight: 'bold',
    },

});