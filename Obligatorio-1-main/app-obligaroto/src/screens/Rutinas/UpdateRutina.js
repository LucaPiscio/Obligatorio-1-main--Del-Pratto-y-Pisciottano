import React, {useState, useEffect} from "react";
import {StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyText from "../../components/MyText";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";
import {Picker} from "@react-native-picker/picker";

const UpdateRutina = () => {
    const [rutinaDiaSearch, setRutinaDiaSearch] = useState('');
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

    const searchRutina = async () => {
        if (!rutinaDiaSearch.trim()) {
            Alert.alert('El dia de la rutina es requerida');
            return;
        }

        try {
            const rutina = await AsyncStorage.getItem(rutinaDiaSearch);
            if (rutina) {
                const rutinaData = JSON.parse(rutina);
                setDia(rutinaData.dia);
                setUserName(rutinaData.userName);
                setNombreEj(rutinaData.nombreEj);
                setTiempo(rutinaData.tiempo);
                setCantidad(rutinaData.cantidad);
            } else {
                Alert.alert('Rutina no encontrada');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error al buscar Rutina');
        }
    };

    const updateRutina = async () => {
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
            const rutina = {dia, userName, nombreEj ,tiempo, cantidad};
            await AsyncStorage.setItem(dia, JSON.stringify(rutina));
            Alert.alert('Rutina actualizada');
        } catch (error) {
            console.error(error);
            Alert.alert('Error al actualizar Rutina');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView keyboardShouldPersistTaps='handled'>
                        <KeyboardAvoidingView behavior="padding">
                            <MyText
                                text='Buscar Rutina'
                                style={styles.text}
                            />
                            <MyInputText
                                placeholder='Ingrese el dia de la rutina'
                                style={styles.inputStyle}
                                onChangeText={(text) => setRutinaDiaSearch(text)}
                            />
                            <MySingleButton
                                title='Buscar'
                                customPress={searchRutina}
                            />
                            <MyInputText
                                placeholder='Ingrese el Dia de la Rutina'
                                value={dia}
                                onChangeText={(text) => setDia(text)}
                            />
                            <Picker
                                selectedValue={selectedUsuario}
                                onValueChange={(itemValue) => setSelectedUsuario(itemValue)}
                            >
                                <Picker.Item label='Seleccione el Usuario' value='' />
                                {usuarios.map((user, index) => (
                                    <Picker.Item key={index} label={user} value={user} />
                                ))}
                            </Picker>
                            <Picker
                                selectedValue={selectedEjercicio}
                                onValueChange={(itemValue) => setSelectedEjercicio(itemValue)}
                            >
                                <Picker.Item label='Seleccione el Ejercicio' value='' />
                                {ejercicios.map((exercise, index) => (
                                    <Picker.Item key={index} label={exercise} value={exercise} />
                                ))}
                            </Picker>
                            <MyInputText
                                placeholder='Ingrese el Tiempo en Minutos'
                                value={tiempo}
                                onChangeText={(text) => setTiempo(text)}
                            />
                            <MyInputText
                                placeholder='Ingrese la cantidad de repeticiones'
                                value={cantidad}
                                onChangeText={(text) => setCantidad(text)}
                            />

                            <MySingleButton
                                title='Actualizar'
                                customPress={updateRutina}
                            />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default UpdateRutina;

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
    text: {
        padding: 10,
        marginLeft: 25,
        color: 'black'
    },
    inputStyle: {
        padding: 25
    },
    keyboardView: {
        flex: 1,
        justifyContent: 'space-between'
    }
});
