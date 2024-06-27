import React, {useState} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyText from "../../components/MyText";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";

const DeleteRutina = ({navigation}) => 
    {
    
        const [dia, setDia] = useState('');
    
        const deleterutina = async () => 
            {
                console.log('deleteRutina');
    
                try
                {
                    const rutina =await AsyncStorage.getItem(dia);
    
                    if(dia)
                        {
                            await AsyncStorage.removeItem(dia);
                            Alert.alert('Rutina eliminada')
                        }
                    else
                        Alert.alert('La rutina no existe');
                }
                catch(error)
                {
                    console.error(error);
                    Alert.alert('Error al eliminar la rutina')
                }
            };
    
            return(
                <SafeAreaView style={styles.container}>
                    <View style= {styles.viewContainer}>
                        <View style={styles.generalView}>
                            <ScrollView>
                                    <MyText 
                                        text= 'Buscar Rutina a eliminar'
                                        style= {styles.text}
                                    />
                                    <KeyboardAvoidingView style={styles.keyboardView}>
                                        <MyInputText 
                                            placeholder = 'Dia de la Rutina'
                                            style={styles.inputStyle}
                                            onChangeText= {(text) => setDia(text)}
                                        />
                                        <MySingleButton
                                            title='Borrar rutina'
                                            customPress={deleterutina}
                                        />
                                    </KeyboardAvoidingView>
                            </ScrollView>
                        </View>
                    </View>
                </SafeAreaView>
            );
    }
    
    export default DeleteRutina;
    
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