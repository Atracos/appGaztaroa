import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, ImageBackground } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { baseUrl } from '../comun/comun';

function RenderItem({ item }) {
    if (!item) return <View />;
    
    return (
        <Card style={styles.card}>
            <ImageBackground source={{ uri: baseUrl + item.imagen }} style={styles.imageBackground}>
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
            cabeceras: [],
            excursiones: [],
            actividades: []
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        try {
            const [cabecerasRes, excursionesRes, actividadesRes] = await Promise.all([
                fetch(`${baseUrl}cabeceras`),
                fetch(`${baseUrl}excursiones`),
                fetch(`${baseUrl}actividades`)
            ]);
            
            const cabeceras = await cabecerasRes.json();
            const excursiones = await excursionesRes.json();
            const actividades = await actividadesRes.json();
            
            this.setState({ cabeceras, excursiones, actividades });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
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
    tituloChocolate: { fontSize: 24, fontWeight: 'bold', color: 'white', textAlign: 'center' }
});

export default Home;