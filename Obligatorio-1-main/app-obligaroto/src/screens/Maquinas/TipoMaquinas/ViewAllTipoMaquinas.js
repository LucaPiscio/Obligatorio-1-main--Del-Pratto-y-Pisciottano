import React, { useState, useEffect} from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyText from "../../../components/MyText";

const ViewAllTipoMaquinas = ({navigation}) => 
    {
        const [tipomaquinas, setTipoMaquinas] = useState([]);

        useEffect(() => 
        {
            const fetchTipoMaquina = async () => 
            {
                try
                {
                    const keys = await AsyncStorage.getAllKeys();
                    const result = await AsyncStorage.multiGet(keys);
                    const tipomaquinaList = result.map(req => JSON.parse(req[1]));
                    
                    if(tipomaquinaList.length > 0)
                    {
                        setTipoMaquinas(tipomaquinaList);
                    }
                    else
                    {
                        Alert.alert(
                            'Mensaje',
                            'No hay Tipo de Maquinas',
                            [{text: 'Ok', onPress: () => navigation.navigate('HomeTipoMaquina')}], {cancelable : false}
                        )
                    }
                }
                catch(error)
                {
                    console.error(error);
                    Alert.alert('Error al cargar maquinas');
                }
            };
            fetchTipoMaquina();
        }, []);

        const listItemView = (item) =>
            {
                return(
                    <View key = {item.TipoMaquinaId} style={StyleSheet.listItemView}>
                        <MyText
                         text = 'Tipo de Maquina:'
                         style = {styles.text}
                         />
                        <MyText
                         text= {item.tipoMaq} 
                         style={styles.text}
                         />
                         <MyText
                         text = 'Foto:'
                         style = {styles.text}
                         />
                        <MyText
                         text= {item.fotoMaq} 
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
                        data = {tipomaquinas}
                        keyExtractor={(item) => item.TipoMaquinaName} 
                        renderItem={({item}) => listItemView(item)}
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    };

export default ViewAllTipoMaquinas;

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