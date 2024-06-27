//Controla la estructura de navegacion
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import HomeUsers from '../screens/HomeUsers';
import RegisterUser from '../screens/Users/RegisterUser';
import UpdateUser from '../screens/Users/UpdateUser';
import DeleteUser from '../screens/Users/DeleteUser';
import ViewUsers from '../screens/Users/ViewUsers';
import ViewAllUsers from '../screens/Users/ViewAllUsers';
import HomeMaquinas from '../screens/HomeMaquinas';
import HomeMaquina from '../screens/HomeMaquina';
import RegisterMaquina from '../screens/Maquinas/RegisterMaquina';
import UpdateMaquina from '../screens/Maquinas/UpdateMaquina';
import DeleteMaquina from '../screens/Maquinas/DeleteMaquina';
import ViewMaquina from '../screens/Maquinas/ViewMaquina';
import ViewAllMaquinas from '../screens/Maquinas/ViewAllMaquinas';
import HomeTipoMaquina from '../screens/HomeTipoMaquina';
import RegisterTipoMaquina from '../screens/Maquinas/TipoMaquinas/RegisterTipoMaquina';
import UpdateTipoMaquina from '../screens/Maquinas/TipoMaquinas/UpdateTipoMaquina';
import DeleteTipoMaquina from '../screens/Maquinas/TipoMaquinas/DeleteTipoMaquina';
import ViewTipoMaquina from '../screens/Maquinas/TipoMaquinas/ViewTipoMaquina';
import ViewAllTipoMaquinas from '../screens/Maquinas/TipoMaquinas/ViewAllTipoMaquinas';
import HomeEjercicio from '..//screens/HomeEjercicio'
import RegisterEjercicio from '../screens/Ejercicio/RegisterEjercicio';
import UpdateEjercicio from '../screens/Ejercicio/UpdateEjercicio';
import DeleteEjercicio from '../screens/Ejercicio/DeleteEjercicio';
import ViewEjercicio from '../screens/Ejercicio/ViewEjercicio';
import ViewAllEjercicios from '../screens/Ejercicio/ViewAllEjercicios';
import HomeRutina from '../screens/HomeRutina';
import RegisterRutina from '../screens/Rutinas/RegisterRutina';
import DeleteRutina from '../screens/Rutinas/DeleteRutina';
import updateRutina from '../screens/Rutinas/UpdateRutina';
import ViewRutina from '../screens/Rutinas/ViewRutina';
import ViewAllRutinas from '../screens/Rutinas/ViewAllRutinas';

const Stack = createStackNavigator();
const RootStack = () => 
    {
        return(
            <NavigationContainer>
                <Stack.Navigator initialRouteName='HomeScreen'>
                    <Stack.Screen name='HomeScreen' component={HomeScreen} options={{title: 'Menu Principal'}}/>
                    <Stack.Screen name='HomeUsers' component={HomeUsers} options={{title: 'Usuarios'}}/>
                    <Stack.Screen name='RegisterUser' component={RegisterUser} options={{title: 'Registro de Usuarios'}}/>
                    <Stack.Screen name='UpdateUser' component={UpdateUser} options={{title: 'Actualizacion de Usuarios'}}/>
                    <Stack.Screen name='DeleteUser' component={DeleteUser} options={{title: 'Eliminacion de Usuarios'}}/>
                    <Stack.Screen name='ViewUsers' component={ViewUsers} options={{title: 'Ver Usuario'}}/>
                    <Stack.Screen name='ViewAllUsers' component={ViewAllUsers} options={{title: 'Ver todos los Usuarios'}}/>
                    <Stack.Screen name='HomeMaquinas' component={HomeMaquinas} options={{title: 'Maquinas'}}/>
                    <Stack.Screen name='HomeMaquina' component={HomeMaquina} options={{title: 'Maquina'}}/>
                    <Stack.Screen name='RegisterMaquina' component={RegisterMaquina} options={{title: 'Registro de Maquinas'}}/>
                    <Stack.Screen name='UpdateMaquina' component={UpdateMaquina} options={{title: 'Actualizacion de Maquinas'}}/>
                    <Stack.Screen name='DeleteMaquina' component={DeleteMaquina} options={{title: 'Eliminacion de Maquinas'}}/>
                    <Stack.Screen name='ViewMaquina' component={ViewMaquina} options={{title: 'Ver Maquina'}}/>
                    <Stack.Screen name='ViewAllMaquinas' component={ViewAllMaquinas} options={{title: 'Ver todos los Maquinas'}}/>
                    <Stack.Screen name='HomeTipoMaquina' component={HomeTipoMaquina} options={{title: 'Tipo de Maquinas'}}/>
                    <Stack.Screen name='RegisterTipoMaquina' component={RegisterTipoMaquina} options={{title: 'Registro de Tipo de Maquinas'}}/>
                    <Stack.Screen name='UpdateTipoMaquina' component={UpdateTipoMaquina} options={{title: 'Actualizacion de Tipo de Maquinas'}}/>
                    <Stack.Screen name='DeleteTipoMaquina' component={DeleteTipoMaquina} options={{title: 'Eliminacion de Tipo de Maquinas'}}/>
                    <Stack.Screen name='ViewTipoMaquina' component={ViewTipoMaquina} options={{title: 'Ver Tipo de Maquina'}}/>
                    <Stack.Screen name='ViewAllTipoMaquinas' component={ViewAllTipoMaquinas} options={{title: 'Ver todos los Tipo de Maquinas'}}/>
                    <Stack.Screen name='HomeEjercicio' component={HomeEjercicio} options={{title: 'Ejercicios'}}/>
                    <Stack.Screen name='RegisterEjercicio' component={RegisterEjercicio} options={{title: 'Registro de Ejercicio'}}/>
                    <Stack.Screen name='UpdateEjercicio' component={UpdateEjercicio} options={{title: 'Actualizacion de Ejercicios'}}/>
                    <Stack.Screen name='DeleteEjercicio' component={DeleteEjercicio} options={{title: 'Eliminacion de Ejercicios'}}/>
                    <Stack.Screen name='ViewEjercicio' component={ViewEjercicio} options={{title: 'Ver Maquina'}}/>
                    <Stack.Screen name='ViewAllEjercicios' component={ViewAllEjercicios} options={{title: 'Ver todos los Ejercicios'}}/>
                    <Stack.Screen name='HomeRutina' component={HomeRutina} options={{title:'Rutinas'}}/>
                    <Stack.Screen name='RegisterRutina' component={RegisterRutina} options={{title: 'Registro de Rutinas'}}/>
                    <Stack.Screen name='DeleteRutina' component={DeleteRutina} options={{title: 'Eliminacion de Rutina'}}/>
                    <Stack.Screen name='UpdateRutina' component={updateRutina} options={{title: 'Actualizacion de Rutina'}}/>
                    <Stack.Screen name='ViewRutina' component={ViewRutina} options={{title: 'Ver Rutina'}}/>
                    <Stack.Screen name='ViewAllRutinas' component={ViewAllRutinas} options={{title: 'Ver todas las Rutinas'}}/>
                </Stack.Navigator>
            </NavigationContainer>
        );   
    };

export default RootStack;