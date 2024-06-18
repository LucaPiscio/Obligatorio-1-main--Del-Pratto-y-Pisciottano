import React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";

import MyButton from "../components/MyButton";

const HomeTipoMaquina = ({navigation}) => 
    {
        return(
            <SafeAreaView style={styles.container}>
                <View style={styles.viewContainer}>
                    <View style={styles.generalView}>
                        <View style={styles.generalView}>
                            <ScrollView>
                            <MyButton 
                                    title='Home'
                                    btnColor='green'
                                    btnIcon='user-circle'
                                    customPress={ () => navigation.navigate('HomeScreen')}/>
                                <MyButton 
                                    title='Registro de Tipo de Maquinas'
                                    btnColor='blue'
                                    btnIcon='user-plus'
                                    customPress={ () => navigation.navigate('RegisterTipoMaquina')}/>
                                <MyButton 
                                    title='Actualizar Tipo de Maquinas'
                                    btnColor='#8B008B'
                                    btnIcon='user-plus'
                                    customPress={ () => navigation.navigate('UpdateTipoMaquina')}/>
                                <MyButton 
                                    title='Borrar de Tipo de Maquinas'
                                    btnColor='red'
                                    btnIcon='user-times'
                                    customPress={ () => navigation.navigate('DeleteTipoMaquina')}/>
                                <MyButton 
                                    title='Ver Tipo de Maquinas'
                                    btnColor='grey'
                                    btnIcon='users'
                                    customPress={ () => navigation.navigate('ViewTipoMaquina')}/>
                                <MyButton 
                                    title='Ver todos las Tipo de Maquinas'
                                    btnColor='black'
                                    btnIcon='users'
                                    customPress={ () => navigation.navigate('ViewAllTipoMaquinas')}/>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    };

export default HomeTipoMaquina;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    viewContainer: {
        flex:1,
        backgroundColor: 'skyblue'
    },
    generalView: {
        flex: 1,
        justifyContent: 'center'
    }
});