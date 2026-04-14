import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Importa esto
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import Campobase from './componentes/CampobaseComponent';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}> {/* Envuelve todo aquí */}
      <SafeAreaProvider>
        <PaperProvider>
          <Campobase />
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}