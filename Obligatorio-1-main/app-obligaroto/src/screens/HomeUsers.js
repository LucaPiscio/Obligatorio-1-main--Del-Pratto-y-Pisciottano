import React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";

import MyButton from "../components/MyButton";

const HomeUsers = ({navigation}) => 
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
                                    title='Registro de Usuarios'
                                    btnColor='blue'
                                    btnIcon='user-plus'
                                    customPress={ () => navigation.navigate('RegisterUser')}/>
                                <MyButton 
                                    title='Actualizar Usuarios'
                                    btnColor='#8B008B'
                                    btnIcon='user-plus'
                                    customPress={ () => navigation.navigate('UpdateUser')}/>
                                <MyButton 
                                    title='Borrar de Usuarios'
                                    btnColor='red'
                                    btnIcon='user-times'
                                    customPress={ () => navigation.navigate('DeleteUser')}/>
                                <MyButton 
                                    title='Ver Usuarios'
                                    btnColor='grey'
                                    btnIcon='users'
                                    customPress={ () => navigation.navigate('ViewUsers')}/>
                                <MyButton 
                                    title='Ver todos los Usuarios'
                                    btnColor='black'
                                    btnIcon='users'
                                    customPress={ () => navigation.navigate('ViewAllUsers')}/>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    };

export default HomeUsers;

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