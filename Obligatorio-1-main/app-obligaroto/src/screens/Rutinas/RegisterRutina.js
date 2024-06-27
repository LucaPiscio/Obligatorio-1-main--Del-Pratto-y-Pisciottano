import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";

const RegisterRutina = ({ navigation }) => {
    const [dia, setDia] = useState('');
    const [tiempo, setTiempo] = useState('');
    const [userName, setUserName] = useState(''); 
    const [nombreEj, setNombreEj] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [ejercicios, setEjercicios] = useState([]);
    const [selectedEjercicio, setSelectedEjercicio] = useState('');
    const [selectedUsuario, setSelectedUsuario] = useState('');

    useEffect(() => {
        const fetchUsuariosEjercicios = async () => {
            try {
                const keys = await AsyncStorage.getAllKeys();
                const result = await AsyncStorage.multiGet(keys);
                const usersL = result.map(req => JSON.parse(req[1]).userName);
                const ejerciciosL = result.map(req => JSON.parse(req[1]).nombreEj);
                setUsuarios(usersL);
                setEjercicios(ejerciciosL);
            } catch (error) {
                console.error(error);
                Alert.alert('Error al cargar usuarios y ejercicios');
            }
        };
        fetchUsuariosEjercicios();
    }, []);

    const clearData = () => {
        setDia('');
        setUserName('');
        setNombreEj('');
        setTiempo('');
        setCantidad('');
    }

    const registerRutina = async () => {
        console.log('states', dia, userName, nombreEj, tiempo, cantidad);
        if (!dia.trim()) {
            Alert.alert('Ingrese el día de la rutina');
            return;
        }
        if (!selectedUsuario.trim()) {
            Alert.alert('Seleccione el usuario');
            return;
        }
        if (!selectedEjercicio.trim()) {
            Alert.alert('Seleccione el ejercicio');
            return;
        }
        if (!tiempo.trim()) {
            Alert.alert('Ingrese el tiempo de rutina');
            return;
        }
        if (!cantidad.trim()) {
            Alert.alert('Ingrese la cantidad de repeticiones');
            return;
        }

        try {
            const existingRutina = await AsyncStorage.getItem(dia);
            if (existingRutina) {
                Alert.alert('La rutina con este dia ya está registrada');
                return;
            }

            const rutina = { dia, userName: selectedUsuario, nombreEj: selectedEjercicio, tiempo, cantidad };

            await AsyncStorage.setItem(dia, JSON.stringify(rutina));
            clearData();
            Alert.alert(
                'Éxito',
                'Rutina Registrada',
                [{ text: 'Ok', onPress: () => navigation.navigate('HomeRutina') }],
                { cancelable: false }
            );
        } catch (error) {
            console.error(error);
            Alert.alert('Error al registrar rutina');
        }
    };

    const renderUsuarios = () => {
        return usuarios.map((user, index) => (
            <Picker.Item key={index} label={user} value={user} />
        ));
    };

    const renderEjercicios = () => {
        return ejercicios.map((exercise, index) => (
            <Picker.Item key={index} label={exercise} value={exercise} />
        ));
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView>
                        <KeyboardAvoidingView style={styles.keyboardView}>
                            <MyInputText
                                placeholder='Día de la Rutina'
                                onChangeText={setDia}
                                style={styles.nameInput}
                                value={dia}
                            />
                            <Picker
                                selectedValue={selectedUsuario}
                                onValueChange={(itemValue) => setSelectedUsuario(itemValue)}
                            >
                                <Picker.Item label='Seleccione el Usuario' value='' />
                                {renderUsuarios()}
                            </Picker>
                            <Picker
                                selectedValue={selectedEjercicio}
                                onValueChange={(itemValue) => setSelectedEjercicio(itemValue)}
                            >
                                <Picker.Item label='Seleccione el Ejercicio' value='' />
                                {renderEjercicios()}
                            </Picker>
                            <MyInputText
                                placeholder='Tiempo en minutos'
                                onChangeText={setTiempo}
                                style={styles.nameInput}
                                value={tiempo}
                                keyboardType="numeric"
                            />
                            <MyInputText
                                placeholder='Cantidad de repeticiones'
                                onChangeText={setCantidad}
                                style={styles.nameInput}
                                value={cantidad}
                                keyboardType="numeric"
                            />
                            <MySingleButton
                                title='Guardar Rutina'
                                customPress={registerRutina}
                            />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default RegisterRutina;

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
    keyboardView: {
        flex: 1,
        justifyContent: 'space-between'
    },
    nameInput: {
        padding: 15,
        textAlignVertical: 'top'
    },
});
