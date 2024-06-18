import React, {useState} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyText from "../../../components/MyText";
import MyInputText from "../../../components/MyInputText";
import MySingleButton from "../../../components/MySingleButton";

const UpdateTipoMaquina = () => {
    
    const [tipoMaquinaIdSearch, setTipoMaquinaIdSearch] = useState('')
    const [tipoMaq, setTipoMaq] = useState('');
    const [fotoMaq, setFotoMaq] = useState('');

    const searchTipoMaquina = async () => {
        console.log('searchTipoMaquina')
        if(!tipoMaquinaIdSearch.trim()){
            Alert.alert('El Tipo de Maquina es requerida')
            return;
        }

        try{
            const maquina = await AsyncStorage.getItem(tipoMaquinaIdSearch)
            if(maquina)
            {
                const maquinaData = JSON.parse(maquina)
                setTipoMaq(maquinaData.tipoMaq)
                setFotoMaq(maquinaData.fotoMaq)
            }
            else
            {
                Alert.alert('Tipo Maquina no encontrado')
            }
        }
        catch(error){
            console.error(error)
            Alert.alert('Error al buscar Tipo Maquina')
        }
    };

    const updateTipoMaquina = async () =>
        {
            console.log('updateTipoMaquina')

            if(!tipoMaq.trim())
            {
                Alert.alert('El tipo de maquina es requerido');
                return;
            }
            if(!fotoMaq.trim())
                {
                    Alert.alert('El numero de sala donde esta la maquina es requerido');
                    return;
                }

            try
            {
                const maquina = {tipoMaq,fotoMaq};
                await AsyncStorage.setItem(tipoMaq, JSON.stringify(maquina))
                Alert.alert('Tipo de Maquina actualizada')
            }
            catch(error)
            {
                console.error(error)
                Alert.alert('Error al actualizar Tipo de Maquina')
            }
        };

        return(
            <SafeAreaView style={styles.container}>
                <View style = {styles.viewContainer}>
                    <View style = {styles.generalView}>
                        <ScrollView keyboardShouldPersistTaps = 'handled'>
                            <KeyboardAvoidingView behavior="padding">
                                <MyText 
                                    text = 'Buscar Tipo Maquina'
                                    style = {styles.text}
                                />
                                <MyInputText 
                                    placeholder = 'Ingrese el tipo de maquina'
                                    style={styles.inputStyle}
                                    onChangeText= {(text) => setTipoMaquinaIdSearch(text)}
                                />
                                <MySingleButton
                                    title = 'Buscar'
                                    customPress = {searchTipoMaquina}
                                 />
                                <MyInputText 
                                    placeholder = 'Ingrese el tipo de maquina'
                                    value = {tipoMaq}
                                    onChangeText= {(text) => setTipoMaq(text)}
                                />
                                <MyInputText 
                                    placeholder = 'Ingrese foto del tipo de la maquina'
                                    value = {fotoMaq}
                                    onChangeText= {(text) => setFotoMaq(text)}
                                />

                                <MySingleButton
                                    title = 'Actualizar'
                                    customPress = {updateTipoMaquina}
                                 />
                            </KeyboardAvoidingView>
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        )
}

export default UpdateTipoMaquina;

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    viewContainer: {
        flex:1,
        backgroundColor: 'white'
    },
    generalView: {
        flex:1
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
        flex:1,
        justifyContent: 'space-between'
    }
});