import React, {useState} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyText from "../../../components/MyText";
import MyInputText from "../../../components/MyInputText";
import MySingleButton from "../../../components/MySingleButton";

const ViewTipoMaquina = ({navigation}) => {
    const [tipomaquinaId, setTipoMaquinaId] = useState('');
    const [tipomaquinaData, setTipoMaquinaData] = useState(null);

    const getTipoMaquinaData = async () => {
        console.log('getTipoMaquinaData')

        setTipoMaquinaData(null);
        if(!tipomaquinaId.trim())
            {
                Alert.alert('El tipo de maquina es requerido');
                return;
            }

        try
        {
            const tipomaquina = await AsyncStorage.getItem(tipomaquinaId);
            if(tipomaquina)
                {
                    setTipoMaquinaData(JSON.parse(tipomaquina));
                }
            else
                Alert.alert('El usuario no existe')
        }
        catch(error)
        {
            console.error(error);
            Alert.alert('Error al buscar usuario');
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
                                placeholder = 'Tipo de maquina a buscar'
                                onChangeText= {(text) => setTipoMaquinaId(text)}
                            />
                            <MySingleButton
                                title='Buscar'
                                customPress={getTipoMaquinaData}
                            />
                            <View style={styles.presenterView}>
                                <MyText 
                                    text= {`Tipo de Maquina: ${!tipomaquinaData ? '' : tipomaquinaData.tipoMaq}`} 
                                    style= {styles.presenterText}
                                />
                            </View>
                            <View style={styles.presenterView}>
                                <MyText 
                                    text= {`Foto: ${!tipomaquinaData ? '' : tipomaquinaData.fotoMaq}`} 
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

export default ViewTipoMaquina;

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