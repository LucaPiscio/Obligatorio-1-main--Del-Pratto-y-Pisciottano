import React, {useState} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyText from "../../components/MyText";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";

const ViewMaquina = ({navigation}) => {
    const [maquinaId, setMaquinaId] = useState('');
    const [maquinaData, setMaquinaData] = useState(null);

    const getMaquinaData = async () => {
        console.log('getMaquinaData')

        setMaquinaData(null);
        if(!maquinaId.trim())
            {
                Alert.alert('El Id de maquina es requerido');
                return;
            }

        try
        {
            const maquina = await AsyncStorage.getItem(maquinaId);
            if(maquina)
                {
                    setMaquinaData(JSON.parse(maquina));
                }
            else
                Alert.alert('La maquina no existe')
        }
        catch(error)
        {
            console.error(error);
            Alert.alert('Error al buscar maquina');
        }
    };

    return(
        <SafeAreaView style={styles.container}>
            <View style= {styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView>
                        <KeyboardAvoidingView style={styles.keyboardView}>
                            <MyText 
                                text= 'Filtro de Maquina'
                                style= {styles.text}
                            />
                            <MyInputText 
                                style={styles.inputStyle}
                                placeholder = 'Id de maquina a buscar'
                                onChangeText= {(text) => setMaquinaId(text)}
                            />
                            <MySingleButton
                                title='Buscar'
                                customPress={getMaquinaData}
                            />
                            <View style={styles.presenterView}>
                                <MyText 
                                    text= {`Tipo de Maquina: ${!maquinaData ? '' : maquinaData.tipoMaq}`} 
                                    style= {styles.presenterText}
                                />
                            </View>
                            <View style={styles.presenterView}>
                                <MyText 
                                    text= {`Nro de sala de maquina: ${!maquinaData ? '' : maquinaData.nroSala}`} 
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

export default ViewMaquina;

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