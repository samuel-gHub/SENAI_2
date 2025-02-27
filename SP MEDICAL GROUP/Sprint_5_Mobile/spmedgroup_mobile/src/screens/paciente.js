import React, { Component, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    FlatList,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';




export default class Paciente extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listaConsultas: [],
        };
    }

    Logout = async () => {
        await AsyncStorage.removeItem('userToken');
        this.props.navigation.navigate('pgLogin');
    }


    buscarConsultas = async () => {

        const token = await AsyncStorage.getItem('userToken')

        const resposta = await api.get('/Usuarios/ListarMinhasConsultas', {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        });

        //console.warn(resposta);

        const dadosDaApi = resposta.data;
        this.setState({ listaConsultas: dadosDaApi });
    };

    componentDidMount() {
        this.buscarConsultas();
        //console.warn(listaConsultas);
    }


    render() {
        return (
            <ImageBackground style={styles.fundoMedico} source={require('../../assets/img/pacient.jpeg')}>
                <StatusBar animated={true}
                    backgroundColor="#61dafb"
                    //barStyle={statusBarStyle}
                    //showHideTransition={statusBarTransition}
                    hidden={false}
                />
                <View style={styles.header}>
                    <Text style={styles.tagTitle}>Paciente</Text>
                    <TouchableOpacity onPress={this.Logout}>
                        <Image source={require('../../assets/img/btn_Sair.png')} />
                    </TouchableOpacity>
                </View>


                <FlatList
                    contentContainerStyle={styles.mainBodyContent}
                    data={this.state.listaConsultas}
                    keyExtractor={item => item.idConsulta}
                    renderItem={this.renderItem}
                />

            </ImageBackground>
        )
    }

    renderItem = ({ item }) => (
        <View style={styles.flatListBox}>
            <View style={styles.flatListLinha}>
                <Text style={styles.flatListTitulo}>Paciente: </Text>
                <Text style={styles.flatListInfos}>{item.idPacienteNavigation.nomeCompleto}</Text>
            </View>
            <View style={styles.flatListLinha}>
                <Text style={styles.flatListTitulo}>Médico: </Text>
                <Text style={styles.flatListInfos}>{item.idMedicoNavigation.nomeCompleto}</Text>
            </View>
            <View style={styles.flatListLinha}>
                <Text style={styles.flatListTitulo}>Data: </Text>
                <Text style={styles.flatListInfos}>
                    {Intl.DateTimeFormat("pt-BR", {
                        year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false
                    }).format(new Date(item.dataHorario))}
                </Text>
            </View>
            <View style={styles.flatListLinha}>
                <Text style={styles.flatListTitulo}>Situação: </Text>
                <Text style={styles.flatListInfos}>{item.idSituacaoNavigation.titulo}</Text>
            </View>
            <View style={styles.flatListLinha}>
                <Text style={styles.flatListTitulo}>Resumo: </Text>
                <Text style={styles.flatListInfos}>{item.resumo}</Text>
            </View>



        </View>

    )


}

const styles = StyleSheet.create({

    fundoMedico: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingRight: 20,
        height: 50,
        width: '100%',
        alignItems: "center",
        backgroundColor: 'rgba(3,166,150,.9)',
    },

    tagTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },

    mainBodyContent: {
        // alignItems: 'center',
        // backgroundColor: '#FFF',
        // width: 350,
        marginTop: 15,
        paddingBottom: 30,

    },

    flatListBox: {
        backgroundColor: 'rgba(3, 166, 150, 0.85)',
        //width: 350,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 10,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#05F29B'
    },

    flatListLinha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    flatListTitulo: {
        width: '25%',
        color: '#FFF',
        fontWeight: 'bold',
    },

    flatListInfos: {
        width: '75%',
        textAlign: 'right',
        color: '#FFF',
    }

});

