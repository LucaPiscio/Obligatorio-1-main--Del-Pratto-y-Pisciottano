import React, {useState} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyText from "../../components/MyText";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";

const DeleteMaquina = ({navigation}) => 
{

    const [maquinaId, setMaquinaId] = useState('');

    const deleteMaquina = async () => 
        {
            console.log('deleteMaquina');

            try
            {
                const maquina =await AsyncStorage.getItem(maquinaId);

                if(maquina)
                    {
                        await AsyncStorage.removeItem(maquinaId);
                        Alert.alert('Maquina eliminada')
                    }
                else
                    Alert.alert('La maquina no existe');
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
                                    text= 'Buscar la maquina a eliminar'
                                    style= {styles.text}
                                />
                                <KeyboardAvoidingView style={styles.keyboardView}>
                                    <MyInputText 
                                        placeholder = 'Id de maquina'
                                        style={styles.inputStyle}
                                        onChangeText= {(text) => setMaquinaId(text)}
                                    />
                                    <MySingleButton
                                        title='Borrar maquina'
                                        customPress={deleteMaquina}
                                    />
                                </KeyboardAvoidingView>
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        );
}

export default DeleteMaquina;

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