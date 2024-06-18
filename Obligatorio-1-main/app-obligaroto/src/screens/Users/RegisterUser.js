import React, {useState} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";

const RegisterUser = ({navigation}) => {
    const [userName, setUserName] = useState('');
    const [Apellido, setApellido] = useState('');
    const [Cedula, setCedula] = useState('');
    const [Fnac, setFnac] = useState('');

    const clearData = () => {
        setUserName('');
        setApellido('');
        setCedula('');
        setFnac('');
    }

    const registerUser = async () => {
        console.log('states', userName, Apellido,Cedula,Fnac);
        if (!userName.trim()) {
            Alert.alert('Ingrese su nombre de usuario');
            return;
        }
        if (!Apellido.trim()) {
            Alert.alert('Ingrese su Apellido');
            return;
        }
        if (!Cedula.trim()) {
            Alert.alert('Ingrese su Cedula');
            return;
        }
        if (!Fnac.trim()) {
            Alert.alert('Ingrese su Fecha de Nacimiento');
            return;
        }

        try {
            const existingUser = await AsyncStorage.getItem(Cedula);
            if (existingUser) {
                Alert.alert('El usuario con esta cédula ya está registrado');
                return;
            }

            const user = {userName, Apellido, Cedula, Fnac};

            await AsyncStorage.setItem(userName, JSON.stringify(user));
            clearData();
            Alert.alert(
                'Éxito',
                'Usuario Registrado',
                [{ text: 'Ok', onPress: () => navigation.navigate('HomeUsers') }],
                { cancelable: false }
            );
        } catch (error) {
            console.error(error);
            Alert.alert('Error al registrar usuario');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView>
                        <KeyboardAvoidingView style={styles.keyboardView}>
                            <MyInputText
                                placeholder='Nombre de Usuario'
                                onChangeText={setUserName}
                                style={styles.nameInput}
                                value={userName}
                            />
                            <MyInputText
                                placeholder='Apellido'
                                onChangeText={setApellido}
                                style={styles.nameInput}
                                value={Apellido}
                            />
                            <MyInputText
                                placeholder='Cedula'
                                onChangeText={setCedula}
                                style={styles.nameInput}
                                value={Cedula}
                            />
                            <MyInputText
                                placeholder='Fnac'
                                onChangeText={setFnac}
                                style={styles.nameInput}
                                value={Fnac}
                            />
                            <MySingleButton
                                title='Guardar Usuario'
                                customPress={registerUser}
                            />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default RegisterUser;

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
    emailInput: {
        padding: 15,
        textAlignVertical: 'top'
    }
});
