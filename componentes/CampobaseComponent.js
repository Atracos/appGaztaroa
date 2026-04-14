import React, { Component } from 'react';
import { Platform, View, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons'; // <--- Importamos los iconos

import Home from './HomeComponent';
import Calendario from './CalendarioComponent';
import DetalleExcursion from './DetalleExcursionComponent';
import { EXCURSIONES } from '../comun/excursiones';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Recibimos "navigation" para poder abrir el Drawer
function HomeNavegador({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#015afc' },
        headerTitleStyle: { color: '#fff' },
        // Añadimos el botón a la izquierda de la cabecera
        headerLeft: () => ( 
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 10, marginRight: 15 }}>
            <Ionicons name="menu" size={28} color="white" />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="Home" component={Home} options={{ title: 'Campo Base' }} />
    </Stack.Navigator>
  );
}

// Recibimos "navigation" y "excursiones"
function CalendarioNavegador({ navigation, excursiones }) {
  return (
    <Stack.Navigator
      initialRouteName="Calendario"
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#015afc' },
        headerTitleStyle: { color: '#fff' },
      }}
    >
      <Stack.Screen 
        name="Calendario" 
        options={{ 
          title: 'Calendario Gaztaroa',
          // Botón de menú también aquí
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 10, marginRight: 15 }}>
              <Ionicons name="menu" size={28} color="white" />
            </TouchableOpacity>
          ),
        }}
      >
        {(props) => <Calendario {...props} excursiones={excursiones} />}
      </Stack.Screen>
      
      <Stack.Screen name="DetalleExcursion" options={{ title: 'Detalle Excursión' }}>
        {(props) => <DetalleExcursion {...props} excursiones={excursiones} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

class Campobase extends Component {
  constructor(props) {
    super(props);
    this.state = { excursiones: EXCURSIONES };
  }

  render() {
    return (
      <NavigationContainer>
        <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
          <Drawer.Navigator
            initialRouteName="Campo base"
            screenOptions={{
              headerShown: false, // Oculta la cabecera doble
              drawerStyle: { backgroundColor: '#c2d3da' },
            }}
          >
            <Drawer.Screen name="Campo base" component={HomeNavegador} />
            <Drawer.Screen name="Calendario">
              {(props) => <CalendarioNavegador {...props} excursiones={this.state.excursiones} />}
            </Drawer.Screen>
          </Drawer.Navigator>
        </View>
      </NavigationContainer>
    );
  }
}

export default Campobase;