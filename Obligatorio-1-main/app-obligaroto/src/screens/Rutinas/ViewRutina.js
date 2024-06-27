import React, {useState} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyText from "../../components/MyText";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";

const ViewRutina = ({navigation}) => {
    const [dia, setDia] = useState('');
    const [rutinaData, setRutinaData] = useState(null);

    const getRutinaData = async () => {
        console.log('getRutinaData')

        setRutinaData(null);
        if(!dia.trim())
            {
                Alert.alert('El dia de la rutina es requerida');
                return;
            }

        try
        {
            const rutina = await AsyncStorage.getItem(dia);
            if(rutina)
                {
                    setRutinaData(JSON.parse(rutina));
                }
            else
                Alert.alert('La Rutina no existe')
        }
        catch(error)
        {
            console.error(error);
            Alert.alert('Error al buscar Rutina');
        }
    };

    return(
        <SafeAreaView style={styles.container}>
            <View style= {styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView>
                        <KeyboardAvoidingView style={styles.keyboardView}>
                            <MyText 
                                text= 'Filtro de Rutina'
                                style= {styles.text}
                            />
                            <MyInputText 
                                style={styles.inputStyle}
                                placeholder = 'Dia de Rutina a buscar'
                                onChangeText= {(text) => setDia(text)}
                            />
                            <MySingleButton
                                title='Buscar'
                                customPress={getRutinaData}
                            />
                            <View style={styles.presenterView}>
                                <MyText 
                                    text= {`Dia de Rutina: ${!rutinaData ? '' : rutinaData.dia}`} 
                                    style= {styles.presenterText}
                                />
                            </View>
                            <View style={styles.presenterView}>
                                <MyText 
                                    text= {`Usuario: ${!rutinaData ? '' : rutinaData.userName}`} 
                                    style= {styles.presenterText}
                                />
                            </View>
                            <View style={styles.presenterView}>
                                <MyText 
                                    text= {`Ejercicio: ${!rutinaData ? '' : rutinaData.nombreEj}`} 
                                    style= {styles.presenterText}
                                />
                            </View>
                            <View style={styles.presenterView}>
                                <MyText 
                                    text= {`Tiempo: ${!rutinaData ? '' : rutinaData.tiempo}`} 
                                    style= {styles.presenterText}
                                />
                            </View>
                            <View style={styles.presenterView}>
                                <MyText 
                                    text= {`Cantidad: ${!rutinaData ? '' : rutinaData.cantidsad}`} 
                                    style= {styles.presenterText}
                                />
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ViewRutina;

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
    inputStyle:{
        margin:10,
        padding: 14,
        color: 'black'
    },
    presenterView:{
        flex: 2,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 15,
        fontSize: 30
    },
    presenterText:{
        fontSize: 20
    },
    text: {
        padding: 5,
        marginLeft: 10,
        color: 'black',
        alignContent: 'center',
        alignItems: 'center'
    }
});