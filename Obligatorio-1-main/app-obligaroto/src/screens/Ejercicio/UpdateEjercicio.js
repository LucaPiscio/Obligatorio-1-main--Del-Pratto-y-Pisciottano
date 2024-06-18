import React, {useState, useEffect} from "react";
import {StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyText from "../../components/MyText";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";
import {Picker} from "@react-native-picker/picker";

const UpdateEjercicio = () => {
    const [nombreEjSearch, setNombreEjSearch] = useState('');
    const [nombreEj, setNombreEj] = useState('');
    const [tipoMaq, setTipoMaq] = useState('');
    const [tipoMaquinas, setTipoMaquinas] = useState([]);
    const [selectedTipoMaquina, setSelectedTipoMaquina] = useState('');

    useEffect(() => {
        const fetchTipoMaquinas = async () => {
            try {
                const keys = await AsyncStorage.getAllKeys();
                const result = await AsyncStorage.multiGet(keys);
                const tipos = result.map(req => JSON.parse(req[1]).tipoMaq);
                setTipoMaquinas(tipos);
            } catch (error) {
                console.error(error);
                Alert.alert('Error al cargar tipos de máquinas');
            }
        };
        fetchTipoMaquinas();
    }, []);

    const searchEjercicio = async () => {
        if (!nombreEjSearch.trim()) {
            Alert.alert('El nombre de ejercicio es requerido');
            return;
        }

        try {
            const ejercicio = await AsyncStorage.getItem(nombreEjSearch);
            if (ejercicio) {
                const ejercicioData = JSON.parse(ejercicio);
                setNombreEj(ejercicioData.nombreEj);
                setTipoMaq(ejercicioData.tipoMaq);
                setSelectedTipoMaquina(ejercicioData.tipoMaq);
            } else {
                Alert.alert('Ejerciciono encontrado');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error al buscar ejercicio');
        }
    };

    const updateEjercicio = async () => {
        if (!nombreEj.trim()) {
            Alert.alert('El nombre del ejercicio es requerido');
            return;
        }
        if (!tipoMaq.trim()) {
            Alert.alert('El tipo de maquina es requerido');
            return;
        }


        try {
            const ejercicio = {nombreEj, tipoMaq};
            await AsyncStorage.setItem(nombreEj, JSON.stringify(ejercicio));
            Alert.alert('Ejercicio actualizado');
        } catch (error) {
            console.error(error);
            Alert.alert('Error al actualizar Maquina');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView keyboardShouldPersistTaps='handled'>
                        <KeyboardAvoidingView behavior="padding">
                            <MyText
                                text='Buscar Ejercicio'
                                style={styles.text}
                            />
                            <MyInputText
                                placeholder='Ingrese el nombre del ejercicio'
                                style={styles.inputStyle}
                                onChangeText={(text) => setNombreEjSearch(text)}
                            />
                            <MySingleButton
                                title='Buscar'
                                customPress={searchEjercicio}
                            />
                            <MyInputText
                                placeholder='Ingrese el nombre del ejercicio'
                                value={nombreEj}
                                onChangeText={(text) => setNombreEj(text)}
                            />
                            <Picker
                                selectedValue={selectedTipoMaquina}
                                onValueChange={(itemValue) => setSelectedTipoMaquina(itemValue)}
                            >
                                <Picker.Item label='Seleccione el tipo de máquina' value='' />
                                {tipoMaquinas.map((tipo, index) => (
                                    <Picker.Item key={index} label={tipo} value={tipo} />
                                ))}
                            </Picker>

                            <MySingleButton
                                title='Actualizar'
                                customPress={updateEjercicio}
                            />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default UpdateEjercicio;

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
