import React, {useState} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyText from "../../components/MyText";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";

const DeleteEjercicio = ({navigation}) => 
    {
    
        const [nombreEj, setNombreEj] = useState('');
    
        const deleteEjercicio = async () => 
            {
                console.log('deleteEjercicio');
    
                try
                {
                    const ejercicio =await AsyncStorage.getItem(nombreEj);
    
                    if(ejercicio)
                        {
                            await AsyncStorage.removeItem(nombreEj);
                            Alert.alert('Ejercicio eliminado')
                        }
                    else
                        Alert.alert('El ejercicio no existe');
                }
                catch(error)
                {
                    console.error(error);
                    Alert.alert('Error al eliminar el ejercicio')
                }
            };
    
            return(
                <SafeAreaView style={styles.container}>
                    <View style= {styles.viewContainer}>
                        <View style={styles.generalView}>
                            <ScrollView>
                                    <MyText 
                                        text= 'Buscar ejercicio a eliminar'
                                        style= {styles.text}
                                    />
                                    <KeyboardAvoidingView style={styles.keyboardView}>
                                        <MyInputText 
                                            placeholder = 'Nombre de ejercicio'
                                            style={styles.inputStyle}
                                            onChangeText= {(text) => setNombreEj(text)}
                                        />
                                        <MySingleButton
                                            title='Borrar ejercicio'
                                            customPress={deleteEjercicio}
                                        />
                                    </KeyboardAvoidingView>
                            </ScrollView>
                        </View>
                    </View>
                </SafeAreaView>
            );
    }
    
    export default DeleteEjercicio;
    
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