import React, {useState, useEffect} from "react";
import {StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyText from "../../components/MyText";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";
import {Picker} from "@react-native-picker/picker";

const UpdateMaquina = () => {
    const [maquinaIdSearch, setMaquinaIdSearch] = useState('');
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

    const searchMaquina = async () => {
        if (!maquinaIdSearch.trim()) {
            Alert.alert('El Id de la Maquina es requerida');
            return;
        }

        try {
            const maquina = await AsyncStorage.getItem(maquinaIdSearch);
            if (maquina) {
                const maquinaData = JSON.parse(maquina);
                setMaquinaId(maquinaData.maquinaId);
                setTipoMaq(maquinaData.tipoMaq);
                setNroSala(maquinaData.nroSala);
                setSelectedTipoMaquina(maquinaData.tipoMaq);
            } else {
                Alert.alert('Maquina no encontrado');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error al buscar Maquina');
        }
    };

    const updateMaquina = async () => {
        if (!maquinaId.trim()) {
            Alert.alert('El Id de la maquina es requerido');
            return;
        }
        if (!tipoMaq.trim()) {
            Alert.alert('El tipo de maquina es requerido');
            return;
        }
        if (!nroSala.trim()) {
            Alert.alert('El numero de sala donde esta la maquina es requerido');
            return;
        }

        try {
            const maquina = {maquinaId, tipoMaq, nroSala};
            await AsyncStorage.setItem(maquinaId, JSON.stringify(maquina));
            Alert.alert('Maquina actualizada');
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
                                text='Buscar Maquina'
                                style={styles.text}
                            />
                            <MyInputText
                                placeholder='Ingrese el Id de la maquina'
                                style={styles.inputStyle}
                                onChangeText={(text) => setMaquinaIdSearch(text)}
                            />
                            <MySingleButton
                                title='Buscar'
                                customPress={searchMaquina}
                            />
                            <MyInputText
                                placeholder='Ingrese el Id de la maquina'
                                value={maquinaId}
                                onChangeText={(text) => setMaquinaId(text)}
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
                            <MyInputText
                                placeholder='Ingrese el nro de salsa donde esta la maquina'
                                value={nroSala}
                                onChangeText={(text) => setNroSala(text)}
                            />

                            <MySingleButton
                                title='Actualizar'
                                customPress={updateMaquina}
                            />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default UpdateMaquina;

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
