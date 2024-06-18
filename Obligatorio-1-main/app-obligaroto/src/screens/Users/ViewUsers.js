import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyText from "../../components/MyText";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";

const ViewUsers = ({ navigation }) => {
    const [userName, setUserName] = useState('');
    const [userData, setUserData] = useState(null);

    const getUserData = async () => {
        console.log('getUserData');

        setUserData(null);
        if (!userName.trim()) {
            Alert.alert('El nombre de usuario es requerido');
            return;
        }

        try {
            const user = await AsyncStorage.getItem(userName);
            if (user) {
                const parsedUser = JSON.parse(user);
                console.log('parsedUser:', parsedUser); // Depuración
                setUserData(parsedUser);
            } else {
                Alert.alert('El usuario no existe');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error al buscar usuario');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView>
                        <KeyboardAvoidingView style={styles.keyboardView}>
                            <MyText
                                text='Filtro de usuario'
                                style={styles.text}
                            />
                            <MyInputText
                                style={styles.inputStyle}
                                placeholder='Nombre de usuario a buscar'
                                onChangeText={setUserName}
                                value={userName}
                            />
                            <MySingleButton
                                title='Buscar'
                                customPress={getUserData}
                            />
                            {userData && (
                                <>
                                    <View style={styles.presenterView}>
                                        <MyText
                                            text={`Apellido: ${userData.Apellido}`}
                                            style={styles.presenterText}
                                        />
                                    </View>
                                    <View style={styles.presenterView}>
                                        <MyText
                                            text={`Cedula: ${userData.Cedula}`}
                                            style={styles.presenterText}
                                        />
                                    </View>
                                    <View style={styles.presenterView}>
                                        <MyText
                                            text={`Fecha de Nacimiento: ${userData.Fnac}`}
                                            style={styles.presenterText}
                                        />
                                    </View>
                                </>
                            )}
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ViewUsers;

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
    inputStyle: {
        margin: 10,
        padding: 14,
        color: 'black'
    },
    presenterView: {
        flex: 2,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 15,
        fontSize: 30
    },
    presenterText: {
        fontSize: 20
    },
    text: {
        padding: 5,
        marginLeft: 10,
        color: 'black',
        alignContent: 'center',
        alignItems: 'center'
    },
    keyboardView: {
        flex: 1,
        justifyContent: 'space-between'
    }
});
