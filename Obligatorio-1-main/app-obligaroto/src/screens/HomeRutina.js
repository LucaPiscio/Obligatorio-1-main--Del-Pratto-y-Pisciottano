import React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";

import MyButton from "../components/MyButton";

const HomeRutina = ({navigation}) => 
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
                                    title='Registro de Rutinas'
                                    btnColor='blue'
                                    btnIcon='user-plus'
                                    customPress={ () => navigation.navigate('RegisterRutina')}/>
                                <MyButton 
                                    title='Actualizar Rutinas'
                                    btnColor='#8B008B'
                                    btnIcon='user-plus'
                                    customPress={ () => navigation.navigate('UpdateRutina')}/>
                                <MyButton 
                                    title='Borrar de Rutinas'
                                    btnColor='red'
                                    btnIcon='user-times'
                                    customPress={ () => navigation.navigate('DeleteRutina')}/>
                                <MyButton 
                                    title='Ver Rutinas'
                                    btnColor='grey'
                                    btnIcon='users'
                                    customPress={ () => navigation.navigate('ViewRutina')}/>
                                <MyButton 
                                    title='Ver todos las Rutinas'
                                    btnColor='black'
                                    btnIcon='users'
                                    customPress={ () => navigation.navigate('ViewAllRutinas')}/>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    };

export default HomeRutina;

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