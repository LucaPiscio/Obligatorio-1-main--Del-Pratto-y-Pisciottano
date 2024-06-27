import React, { useState, useEffect} from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyText from "../../components/MyText";

const ViewAllRutinas = ({navigation}) => 
    {
        const [rutina, setRutina] = useState([]);

        useEffect(() => 
        {
            const fetchRutina = async () => 
            {
                try
                {
                    const keys = await AsyncStorage.getAllKeys();
                    const result = await AsyncStorage.multiGet(keys);
                    const rutinaList = result.map(req => JSON.parse(req[1]));
                    
                    if(rutinaList.length > 0)
                    {
                        setRutina(rutinaList);
                    }
                    else
                    {
                        Alert.alert(
                            'Mensaje',
                            'No hay Rutinas',
                            [{text: 'Ok', onPress: () => navigation.navigate('HomeRutina')}], {cancelable : false}
                        )
                    }
                }
                catch(error)
                {
                    console.error(error);
                    Alert.alert('Error al cargar maquinas');
                }
            };
            fetchRutina();
        }, []);

        const listItemView = (item) =>
            {
                return(
                    <View key = {item.dia} style={StyleSheet.listItemView}>
                        <MyText
                        text = 'Dia de la Rutina:'
                        style={styles.text}
                        />
                        <MyText
                         text={item.dia} style={styles.text}
                         />
                        <MyText
                         text = 'Usuario:'
                         style = {styles.text}
                         />
                        <MyText
                         text= {item.userName} 
                         style={styles.text}
                         />
                         <MyText
                         text = 'Tiempo:'
                         style = {styles.text}
                         />
                        <MyText
                         text= {item.tiempo} 
                         style={styles.text}
                         />
                          <MyText
                         text = 'Cantidad:'
                         style = {styles.text}
                         />
                        <MyText
                         text= {item.cantidad} 
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
                        data = {rutina}
                        keyExtractor={(item) => item.rutinaDia} 
                        renderItem={({item}) => listItemView(item)}
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    };

export default ViewAllRutinas;

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