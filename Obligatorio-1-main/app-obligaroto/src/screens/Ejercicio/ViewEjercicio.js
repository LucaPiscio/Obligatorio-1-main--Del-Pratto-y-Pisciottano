import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyText from "../../components/MyText";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";

const ViewEjercicio = ({ navigation }) => {
    const [nombreEj, setNombreEj] = useState('');
    const [ejercicioData, setEjercicioData] = useState(null);

    const getEjercicioData = async () => {
        console.log('getEjercicioData');

        setEjercicioData(null);
        if (!nombreEj.trim()) {
            Alert.alert('El nombre del ejercicio es requerido');
            return;
        }

        try {
            const ejercicio = await AsyncStorage.getItem(nombreEj);
            if (ejercicio) {
                const parsedEjercicio = JSON.parse(ejercicio);
                console.log('parsedEjercicio:', parsedEjercicio); // Depuración
                setEjercicioData(parsedEjercicio);
            } else {
                Alert.alert('El ejercicio no existe');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error al buscar ejercicio');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView>
                        <KeyboardAvoidingView style={styles.keyboardView}>
                            <MyText
                                text='Filtro de ejercicio'
                                style={styles.text}
                            />
                            <MyInputText
                                style={styles.inputStyle}
                                placeholder='Nombre del ejercicio a buscar'
                                onChangeText={setNombreEj}
                                value={nombreEj}
                            />
                            <MySingleButton
                                title='Buscar'
                                customPress={getEjercicioData}
                            />
                            {ejercicioData && (
                                <>
                                      <View style={styles.presenterView}>
                                <MyText 
                                    text= {`Tipo de Ejercicio: ${!ejercicioData ? '' : ejercicioData.tipoMaq}`} 
                                    style= {styles.presenterText}
                                />
                            </View>
                                </>
                            )}
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ViewEjercicio;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    viewContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    generalView: {
        flex: 1
    },
    inputStyle: {
        margin: 10,
        padding: 14,
        color: 'black'
    },
    presenterView: {
        flex: 2,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 15,
        fontSize: 30
    },
    presenterText: {
        fontSize: 20
    },
    text: {
        padding: 5,
        marginLeft: 10,
        color: 'black',
        alignContent: 'center',
        alignItems: 'center'
    },
    keyboardView: {
        flex: 1,
        justifyContent: 'space-between'
    }
});
