import React, {useState} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyText from "../../../components/MyText";
import MyInputText from "../../../components/MyInputText";
import MySingleButton from "../../../components/MySingleButton";

const DeleteTipoMaquina = ({navigation}) => 
{

    const [tipoMaq, setTipoMaq] = useState('');

    const deleteTipoMaquina = async () => 
        {
            console.log('deleteTipoMaquina');

            try
            {
                const tipomaquina =await AsyncStorage.getItem(tipoMaq);

                if(tipomaquina)
                    {
                        await AsyncStorage.removeItem(tipoMaq);
                        Alert.alert('Tipo de Maquina eliminada')
                    }
                else
                    Alert.alert('El tipo de maquina no existe');
            }
            catch(error)
            {
                console.error(error);
                Alert.alert('Error al eliminar el usuario')
            }
        };

        return(
            <SafeAreaView style={styles.container}>
                <View style= {styles.viewContainer}>
                    <View style={styles.generalView}>
                        <ScrollView>
                                <MyText 
                                    text= 'Buscar el tipo de maquina a eliminar'
                                    style= {styles.text}
                                />
                                <KeyboardAvoidingView style={styles.keyboardView}>
                                    <MyInputText 
                                        placeholder = 'Tipo de maquina'
                                        style={styles.inputStyle}
                                        onChangeText= {(text) => setTipoMaq(text)}
                                    />
                                    <MySingleButton
                                        title='Borrar tipo de maquina'
                                        customPress={deleteTipoMaquina}
                                    />
                                </KeyboardAvoidingView>
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        );
}

export default DeleteTipoMaquina;

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
    keyboardView:{
        flex:1,
        justifyContent: 'space-between'
    },
    text: {
        padding: 10,
        marginLeft: 25,
        color: 'black',
    }
});