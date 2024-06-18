import React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";

import MyButton from "../components/MyButton";

const HomeMaquina = ({navigation}) => 
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
                                    title='Registro de Maquinas'
                                    btnColor='blue'
                                    btnIcon='user-plus'
                                    customPress={ () => navigation.navigate('RegisterMaquina')}/>
                                <MyButton 
                                    title='Actualizar Maquinas'
                                    btnColor='#8B008B'
                                    btnIcon='user-plus'
                                    customPress={ () => navigation.navigate('UpdateMaquina')}/>
                                <MyButton 
                                    title='Borrar de Maquinas'
                                    btnColor='red'
                                    btnIcon='user-times'
                                    customPress={ () => navigation.navigate('DeleteMaquina')}/>
                                <MyButton 
                                    title='Ver Maquinas'
                                    btnColor='grey'
                                    btnIcon='users'
                                    customPress={ () => navigation.navigate('ViewMaquina')}/>
                                <MyButton 
                                    title='Ver todos las Maquinas'
                                    btnColor='black'
                                    btnIcon='users'
                                    customPress={ () => navigation.navigate('ViewAllMaquinas')}/>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    };

export default HomeMaquina;

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