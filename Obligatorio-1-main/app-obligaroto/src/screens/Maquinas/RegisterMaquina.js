import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";

const RegisterMaquina = ({ navigation }) => {
    const [maquinaId, setMaquinaId] = useState('');
    const [tipoMaq, setTipoMaq] = useState('');
    const [nroSala, setNroSala] = useState('');
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
        setMaquinaId('');
        setTipoMaq('');
        setNroSala('');
    }

    const registerMaquina = async () => {
        console.log('states', maquinaId, tipoMaq, nroSala);
        if (!maquinaId.trim()) {
            Alert.alert('Ingrese el Id de la maquina');
            return;
        }
        if (!selectedTipoMaquina.trim()) {
            Alert.alert('Seleccione el tipo de maquina');
            return;
        }
        if (!nroSala.trim()) {
            Alert.alert('Ingrese el numero de sala de la maquina');
            return;
        }

        try {
            const existingMaquina = await AsyncStorage.getItem(maquinaId);
            if (existingMaquina) {
                Alert.alert('La máquina con este ID ya está registrada');
                return;
            }

            const maquina = { maquinaId, tipoMaq: selectedTipoMaquina, nroSala };

            await AsyncStorage.setItem(maquinaId, JSON.stringify(maquina));
            clearData();
            Alert.alert(
                'Éxito',
                'Maquina Registrada',
                [{ text: 'Ok', onPress: () => navigation.navigate('HomeMaquina') }],
                { cancelable: false }
            );
        } catch (error) {
            console.error(error);
            Alert.alert('Error al registrar usuario');
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
                                placeholder='Id de la Maquina'
                                onChangeText={setMaquinaId}
                                style={styles.nameInput}
                                value={maquinaId}
                            />
                            <Picker
                                selectedValue={selectedTipoMaquina}
                                onValueChange={(itemValue) => setSelectedTipoMaquina(itemValue)}
                            >
                                <Picker.Item label='Seleccione el tipo de máquina' value='' />
                                {renderTipoMaquinas()}
                            </Picker>
                            <MyInputText
                                placeholder='Nro de sala de la Maquina'
                                onChangeText={setNroSala}
                                style={styles.nameInput}
                                value={nroSala}
                            />
                            <MySingleButton
                                title='Guardar Maquina'
                                customPress={registerMaquina}
                            />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default RegisterMaquina;

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

