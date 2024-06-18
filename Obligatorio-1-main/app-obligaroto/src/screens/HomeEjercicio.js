import React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";

import MyButton from "../components/MyButton";

const HomeEjercicio = ({navigation}) => 
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
                                    title='Registro de Ejercicios'
                                    btnColor='blue'
                                    btnIcon='user-plus'
                                    customPress={ () => navigation.navigate('RegisterEjercicio')}/>
                                <MyButton 
                                    title='Actualizar Ejercicios'
                                    btnColor='#8B008B'
                                    btnIcon='user-plus'
                                    customPress={ () => navigation.navigate('UpdateEjercicio')}/>
                                <MyButton 
                                    title='Borrar de Ejercicios'
                                    btnColor='red'
                                    btnIcon='user-times'
                                    customPress={ () => navigation.navigate('DeleteEjercicio')}/>
                                <MyButton 
                                    title='Ver Ejercicios'
                                    btnColor='grey'
                                    btnIcon='users'
                                    customPress={ () => navigation.navigate('ViewEjercicio')}/>
                                <MyButton 
                                    title='Ver todos las Ejercicios'
                                    btnColor='black'
                                    btnIcon='users'
                                    customPress={ () => navigation.navigate('ViewAllEjercicios')}/>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    };

export default HomeEjercicio;

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