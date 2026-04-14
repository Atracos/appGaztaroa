import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, ImageBackground } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { EXCURSIONES } from '../comun/excursiones';
import { CABECERAS } from '../comun/cabeceras';
import { ACTIVIDADES } from '../comun/actividades';

function RenderItem({ item }) {
    if (!item) return <View />;
    
    return (
        <Card style={styles.card}>
            <ImageBackground source={require('./imagenes/40Años.png')} style={styles.imageBackground}>
                <View style={styles.overlay}>
                    <Text style={styles.tituloChocolate}>{item.nombre}</Text>
                </View>
            </ImageBackground>
            <Card.Content>
                <Text style={styles.descripcion}>{item.descripcion}</Text>
            </Card.Content>
        </Card>
    );
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            excursiones: EXCURSIONES,
            cabeceras: CABECERAS,
            actividades: ACTIVIDADES
        };
    }
    render() {
        return (
            <ScrollView>
            <RenderItem item={this.state.cabeceras.filter((item) => item.destacado)[0]} />
            <RenderItem item={this.state.excursiones.filter((item) => item.destacado)[0]} />
            <RenderItem item={this.state.actividades.filter((item) => item.destacado)[0]} />
            </ScrollView>
        );
}
}

const styles = StyleSheet.create({
    card: { margin: 10 },
    descripcion: { marginTop: 20 },
    imageBackground: { height: 200, justifyContent: 'flex-end' },
    overlay: { backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: 10 }, // Fondo semi-transparente para leer mejor el texto
    tituloChocolate: { fontSize: 24, fontWeight: 'bold', color: 'chocolate', textAlign: 'center' }
});

export default Home;