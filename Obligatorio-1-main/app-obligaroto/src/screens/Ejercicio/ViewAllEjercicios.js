import React, { useState, useEffect} from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyText from "../../components/MyText";

const ViewAllEjercicios = ({navigation}) => 
    {
        const [ejercicios, setEjercicios] = useState([]);

        useEffect(() => 
        {
            const fetchEjercicio = async () => 
            {
                try
                {
                    const keys = await AsyncStorage.getAllKeys();
                    const result = await AsyncStorage.multiGet(keys);
                    const ejercicioList = result.map(req => JSON.parse(req[1]));
                    
                    if(ejercicioList.length > 0)
                    {
                        setEjercicios(ejercicioList);
                    }
                    else
                    {
                        Alert.alert(
                            'Mensaje',
                            'No hay Ejercicios',
                            [{text: 'Ok', onPress: () => navigation.navigate('HomeEjercicio')}], {cancelable : false}
                        )
                    }
                }
                catch(error)
                {
                    console.error(error);
                    Alert.alert('Error al cargar ejercicios');
                }
            };
            fetchEjercicio();
        }, []);

        const listItemView = (item) =>
            {
                return(
                    <View key = {item.nombreEj} style={StyleSheet.listItemView}>
                        <MyText
                        text = 'Nombre del Ejercicio:'
                        style={styles.text}
                        />
                        <MyText
                         text={item.nombreEj} style={styles.text}
                         />
                        <MyText
                         text = 'Tipo de Maquina:'
                         style = {styles.text}
                         />
                        <MyText
                         text= {item.tipoMaq} 
                         style={styles.text}
                         />
                        <MyText
                         text = '------------------------------'
                         style = {styles.text}
                         />
                    </View>
                );
            };

        return(
            <SafeAreaView style = {styles.container}> 
                <View>
                    <View>
                        <FlatList
                        contentContainerStyle = {{paddingHorizontal: 20}}
                        data = {ejercicios}
                        keyExtractor={(item) => item.EjercicioName} 
                        renderItem={({item}) => listItemView(item)}
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    };

export default ViewAllEjercicios;

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
    listView:{
        marginTop: 20
    },
    listItemView:{
        backgroundColor: 'white',
        margin: 5,
        padding: 10,
        borderRadius: 10
    },
    text: {
        padding: 5,
        marginLeft: 10,
        color: 'black',
        alignContent: 'center',
        alignItems: 'center'
    }
});