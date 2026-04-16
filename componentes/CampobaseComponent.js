import React, { Component } from 'react';
import { Platform, View, StyleSheet, Image, Text, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Home from './HomeComponent';
import Calendario from './CalendarioComponent';
import DetalleExcursion from './DetalleExcursionComponent';
import QuienesSomos from './QuienesSomosComponent';
import Contacto from './ContactoComponent';
import { EXCURSIONES } from '../comun/excursiones';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function BotonMenu(props) {
    return (
        <Pressable onPress={props.onPress} hitSlop={8} style={{ marginLeft: 10 }}>
            <MaterialCommunityIcons
                name="menu"
                size={28}
                color={Platform.OS === 'ios' ? '#015afc' : 'white'}
            />
        </Pressable>
    );
}

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
                <View style={styles.drawerHeader}>
                    <View style={styles.drawerHeaderImageContainer}>
                        <Image source={require('./imagenes/logo.png')} style={styles.drawerImage} />
                    </View>
                    <View style={styles.drawerHeaderTextContainer}>
                        <Text style={styles.drawerHeaderText}>Gaztaroa</Text>
                    </View>
                </View>
                <DrawerItemList {...props} />
            </SafeAreaView>
        </DrawerContentScrollView>
    );
}

class Campobase extends Component {
    constructor(props) {
        super(props);
        this.state = { excursiones: EXCURSIONES };
    }

    menuHeaderOptions = (title, navigation) => ({
        title,
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#015afc' },
        headerTitleStyle: { color: '#fff' },
        headerLeft: () => (
            <BotonMenu onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
        ),
    });

    render() {
        return (
            <NavigationContainer>
                <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
                    <Drawer.Navigator
                        initialRouteName="Campo base"
                        drawerContent={(props) => <CustomDrawerContent {...props} />}
                        screenOptions={{ headerShown: false, drawerStyle: { backgroundColor: '#c2d3da' } }}
                    >
                        <Drawer.Screen 
                            name="Campo base" 
                            options={{ drawerIcon: ({ color }) => <MaterialCommunityIcons name="home" color={color} size={24} /> }}
                        >
                            {({ navigation }) => (
                                <Stack.Navigator screenOptions={this.menuHeaderOptions('Campo Base', navigation)}>
                                    <Stack.Screen name="Home" component={Home} />
                                </Stack.Navigator>
                            )}
                        </Drawer.Screen>

                        <Drawer.Screen 
                            name="Quiénes somos" 
                            options={{ drawerIcon: ({ color }) => <MaterialCommunityIcons name="information" color={color} size={24} /> }}
                        >
                            {({ navigation }) => (
                                <Stack.Navigator screenOptions={this.menuHeaderOptions('Quiénes somos', navigation)}>
                                    <Stack.Screen name="Quiénes somos" component={QuienesSomos} />
                                </Stack.Navigator>
                            )}
                        </Drawer.Screen>

                        <Drawer.Screen 
                            name="Calendario" 
                            options={{ drawerIcon: ({ color }) => <MaterialCommunityIcons name="calendar" color={color} size={24} /> }}
                        >
                            {({ navigation }) => (
                                <Stack.Navigator screenOptions={this.menuHeaderOptions('Calendario Gaztaroa', navigation)}>
                                    <Stack.Screen name="Calendario">
                                        {(props) => <Calendario {...props} excursiones={this.state.excursiones} />}
                                    </Stack.Screen>
                                    <Stack.Screen 
                                        name="DetalleExcursion" 
                                        options={{ headerLeft: null }}
                                    >
                                        {(props) => <DetalleExcursion {...props} excursiones={this.state.excursiones} />}
                                    </Stack.Screen>
                                </Stack.Navigator>
                            )}
                        </Drawer.Screen>

                        <Drawer.Screen 
                            name="Contacto" 
                            options={{ drawerIcon: ({ color }) => <MaterialCommunityIcons name="card-account-phone" color={color} size={24} /> }}
                        >
                            {({ navigation }) => (
                                <Stack.Navigator screenOptions={this.menuHeaderOptions('Contacto', navigation)}>
                                    <Stack.Screen name="Contacto" component={Contacto} />
                                </Stack.Navigator>
                            )}
                        </Drawer.Screen>
                    </Drawer.Navigator>
                </View>
            </NavigationContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    drawerHeader: { backgroundColor: '#015afc', height: 100, flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    drawerHeaderImageContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    drawerHeaderTextContainer: { flex: 2, justifyContent: 'center' },
    drawerHeaderText: { color: 'white', fontSize: 24, fontWeight: 'bold' },
    drawerImage: { width: 80, height: 60, resizeMode: 'contain' }
});

export default Campobase;