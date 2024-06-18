import React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";

import MyButton from "../components/MyButton";

const HomeScreen = ({navigation}) => 
    {
        return(
            <SafeAreaView style={styles.container}>
                <View style={styles.viewContainer}>
                    <View style={styles.generalView}>
                        <View style={styles.generalView}>
                            <ScrollView>
                            <MyButton 
                                    title='Maquina'
                                    btnColor='black'
                                    btnIcon='user-circle'
                                    customPress={ () => navigation.navigate('HomeMaquina')}/>
                                <MyButton 
                                    title='Tipo de Maquina'
                                    btnColor='grey'
                                    btnIcon='user-circle'
                                    customPress={ () => navigation.navigate('HomeTipoMaquina')}/>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    };

export default HomeScreen;

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