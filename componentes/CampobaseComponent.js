import React, { Component } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Calendario from './CalendarioComponent';
import DetalleExcursion from './DetalleExcursionComponent';
import { EXCURSIONES } from '../comun/excursiones';

const Stack = createNativeStackNavigator(); // Crea el menú de navegación en stack [cite: 567]

function CalendarioStack() {
  return (
    <Stack.Navigator
      initialRouteName="Calendario"
      screenOptions={{
        headerStyle: { backgroundColor: '#3300FF' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen 
        name="Calendario" 
        options={{ title: 'Calendario Gaztaroa' }}
      >
        {(props) => <Calendario {...props} excursiones={EXCURSIONES} />}
      </Stack.Screen>
      <Stack.Screen 
        name="DetalleExcursion" 
        component={DetalleExcursion} 
        options={{ title: 'Detalle Excursión' }} 
      />
    </Stack.Navigator>
  );
}

class Campobase extends Component {
  render() {
    return (
      <NavigationContainer>
        <View style={{ flex: 1 }}>
          <CalendarioStack />
        </View>
      </NavigationContainer>
    );
  }
}

export default Campobase;