import React, {useState} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyInputText from "../../../components/MyInputText";
import MySingleButton from "../../../components/MySingleButton";

const RegisterTipoMaquina = ({navigation}) => {
    const [tipoMaq, setTipoMaq] = useState('');
    const [fotoMaq, setFotoMaq] = useState('');

    const clearData = () => {
        setTipoMaq('');
        setFotoMaq('');
    }

    const registerTipoMaquina = async () => {
        console.log('states', tipoMaq, fotoMaq);
        if (!tipoMaq.trim()) {
            Alert.alert('Ingrese el tipo de maquina');
            return;
        }
        if (!fotoMaq.trim()) {
            Alert.alert('Ingrese foto de la maquina');
            return;
        }

        try {
            const existingTipoMaquina = await AsyncStorage.getItem(tipoMaq);
            if (existingTipoMaquina) {
                Alert.alert('Este tipo de maquina ya está registrada');
                return;
            }

            const tipomaquina = {tipoMaq, fotoMaq};

            await AsyncStorage.setItem(tipoMaq, JSON.stringify(tipomaquina));
            clearData();
            Alert.alert(
                'Éxito',
                'Tipo de Maquina Registrada',
                [{ text: 'Ok', onPress: () => navigation.navigate('HomeTipoMaquina') }],
                { cancelable: false }
            );
        } catch (error) {
            console.error(error);
            Alert.alert('Error al registrar tipo de maquina');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView>
                        <KeyboardAvoidingView style={styles.keyboardView}>
                            <MyInputText
                                placeholder='Tipo de Maquina'
                                onChangeText={setTipoMaq}
                                style={styles.nameInput}
                                value={tipoMaq}
                            />
                            <MyInputText
                                placeholder='Foto de la Tipo de Maquina'
                                onChangeText={setFotoMaq}
                                style={styles.nameInput}
                                value={fotoMaq}
                            />
                            <MySingleButton
                                title='Guardar Tipo de Maquina'
                                customPress={registerTipoMaquina}
                            />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default RegisterTipoMaquina;

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
