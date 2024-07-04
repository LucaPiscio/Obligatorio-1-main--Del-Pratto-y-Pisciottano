import React, {useState, useEffect} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert, Image, Platform } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyInputText from "../../../components/MyInputText";
import MySingleButton from "../../../components/MySingleButton";

const RegisterTipoMaquina = ({navigation}) => {
    const [tipoMaq, setTipoMaq] = useState('');
    const [fotoMaq, setFotoMaq] = useState('');

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Se necesitan permisos para acceder a la galería de fotos.');
                }
            }
        })();
    }, []);

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

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setFotoMaq(result.assets[0].uri); 
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
                            <MySingleButton
                                title='Seleccionar Foto'
                                customPress={pickImage} 
                            />
                            {fotoMaq && <Image source={{ uri: fotoMaq }} style={{ width: 200, height: 200, alignSelf: 'center' }} />}
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
