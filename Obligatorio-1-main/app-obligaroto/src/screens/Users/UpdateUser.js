import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyText from "../../components/MyText";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";

const UpdateUser = () => {
    const [userNameSearch, setUserNameSearch] = useState('');
    const [userName, setUserName] = useState('');
    const [userApellido, setUserApellido] = useState('');
    const [userCedula, setUserCedula] = useState('');
    const [userFnac, setUserFnac] = useState('');

    const searchUser = async () => {
        console.log('searchUser');
        if (!userNameSearch.trim()) {
            Alert.alert('El nombre de usuario es requerido');
            return;
        }

        try {
            const user = await AsyncStorage.getItem(userNameSearch);
            if (user) {
                const userData = JSON.parse(user);
                setUserName(userData.userName);
                setUserApellido(userData.Apellido);
                setUserCedula(userData.Cedula);
                setUserFnac(userData.Fnac);
            } else {
                Alert.alert('Usuario no encontrado');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error al buscar Usuario');
        }
    };

    const updateUser = async () => {
        console.log('updateUser');

        if (!userName.trim()) {
            Alert.alert('El nombre de usuario es requerido');
            return;
        }
        if (!userApellido.trim()) {
            Alert.alert('El Apellido es requerido');
            return;
        }
        if (!userCedula.trim()) {
            Alert.alert('La cedula es requerida');
            return;
        }
        if (!userFnac.trim()) {
            Alert.alert('La fecha de nacimiento es requerida');
            return;
        }

        try {
            const user = { userName, Apellido: userApellido, Cedula: userCedula, Fnac: userFnac };
            await AsyncStorage.setItem(userName, JSON.stringify(user));
            Alert.alert('Usuario actualizado');
        } catch (error) {
            console.error(error);
            Alert.alert('Error al actualizar el usuario');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView keyboardShouldPersistTaps='handled'>
                        <KeyboardAvoidingView behavior="padding">
                            <MyText
                                text='Buscar Usuario'
                                style={styles.text}
                            />
                            <MyInputText
                                placeholder='Ingrese el nombre de usuario'
                                style={styles.inputStyle}
                                onChangeText={setUserNameSearch}
                                value={userNameSearch}
                            />
                            <MySingleButton
                                title='Buscar'
                                customPress={searchUser}
                            />
                            <MyInputText
                                placeholder='Ingrese el nombre de usuario'
                                value={userName}
                                onChangeText={setUserName}
                            />
                            <MyInputText
                                placeholder='Ingrese el apellido'
                                value={userApellido}
                                onChangeText={setUserApellido}
                            />
                            <MyInputText
                                placeholder='Ingrese la cedula'
                                value={userCedula}
                                onChangeText={setUserCedula}
                            />
                            <MyInputText
                                placeholder='Ingrese la Fecha de nacimiento'
                                value={userFnac}
                                onChangeText={setUserFnac}
                            />
                            <MySingleButton
                                title='Actualizar'
                                customPress={updateUser}
                            />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default UpdateUser;

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
