import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";

const RegisterEjercicio = ({ navigation }) => {
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

    const clearData = () => {
        setNombreEj('');
        setTipoMaq('');
    }

    const registerEjercicio = async () => {
        console.log('states', nombreEj, tipoMaq);
        if (!nombreEj.trim()) {
            Alert.alert('Ingrese el nombre del ejercicio');
            return;
        }
        if (!selectedTipoMaquina.trim()) {
            Alert.alert('Seleccione el tipo de maquina');
            return;
        }

        try {
            const existingMaquina = await AsyncStorage.getItem(nombreEj);
            if (existingMaquina) {
                Alert.alert('el ejercicio con este nombre ya está registrado');
                return;
            }

            const maquina = { nombreEj, tipoMaq: selectedTipoMaquina};

            await AsyncStorage.setItem(nombreEj, JSON.stringify(maquina));
            clearData();
            Alert.alert(
                'Éxito',
                'Ejercicio Registrado',
                [{ text: 'Ok', onPress: () => navigation.navigate('HomeEjercicio') }],
                { cancelable: false }
            );
        } catch (error) {
            console.error(error);
            Alert.alert('Error al registrar ejercicio');
        }
    };

    const renderTipoMaquinas = () => {
        return tipoMaquinas.map((tipo, index) => (
            <Picker.Item key={index} label={tipo} value={tipo} />
        ));
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView>
                        <KeyboardAvoidingView style={styles.keyboardView}>
                            <MyInputText
                                placeholder='Nombre del ejercicio'
                                onChangeText={setNombreEj}
                                style={styles.nameInput}
                                value={nombreEj}
                            />
                            <Picker
                                selectedValue={selectedTipoMaquina}
                                onValueChange={(itemValue) => setSelectedTipoMaquina(itemValue)}
                            >
                                <Picker.Item label='Seleccione el tipo de máquina' value='' />
                                {renderTipoMaquinas()}
                            </Picker>
                            <MySingleButton
                                title='Guardar Ejercicio'
                                customPress={registerEjercicio}
                            />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default RegisterEjercicio;

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

