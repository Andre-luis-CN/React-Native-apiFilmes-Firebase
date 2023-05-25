import React, { useEffect, useState } from 'react';
import { FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import logo from '../../assets/img/img-fundo.jpeg';
import { getList, key } from '../../assets/api/req';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function Films({ navigation }) {

    const onDetail = (id) => {
        navigation.navigate("Details", {
            text: id,
        });
    };

    const [movies, setMovies] = useState([]);

    const [page, setPage] = useState(1);

    async function Anterior() {
        if (page !== 1) {
            setPage(page - 1)
        } else {
            return
        }
    }

    async function Proximo() {
        setPage(page + 1)
    }


    async function changeList() {
        var result = await getList.get(`/popular?api_key=${key}&language=pt-BR&page=${page}`);
        setMovies(result.data.results);
    }

    useEffect(() => {
        changeList();
    }, [])

    useEffect(() => {
        changeList()
    }, [page])


    return (
        <ImageBackground source={logo} style={styles.imglogo}>
            <SafeAreaView style={styles.container}>
                <View style={styles.containerButton}>
                    <TouchableOpacity style={styles.button} onPress={() => Proximo()}><Text style={styles.textButton}>Proximo</Text></TouchableOpacity>
                    <Text style={styles.textPage}> pagina : {page}</Text>
                    <TouchableOpacity style={styles.button} onPress={() => Anterior()}><Text style={styles.textButton}>Anterior</Text></TouchableOpacity>
                </View>
                <FlatList data={movies} keyExtractor={item => item.id} renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => onDetail(item.id)} style={styles.cell}>
                        <View style={styles.cellContainer}>
                            <Image style={styles.image} source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }} />
                            <Text style={styles.title}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                )} />
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
    cellContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginVertical: 15,
        paddingHorizontal: 20,
    },
    image: {
        width: 80,
        height: 150,
        marginVertical: 20,
    },
    textPage: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 10,
    },
    title: {
        color: '#fff',
        fontSize: 20,
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerButton: {
        width: 300,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    button: {
        height: 30,
        backgroundColor: '#ff2020',
        borderRadius: 10,
        paddingHorizontal: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textButton: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    }


});

