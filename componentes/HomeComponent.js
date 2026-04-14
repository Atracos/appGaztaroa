import React, { Component } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { EXCURSIONES } from '../comun/excursiones';
import { CABECERAS } from '../comun/cabeceras';
import { ACTIVIDADES } from '../comun/actividades';

function RenderItem(props) {
    const item = props.item;
    if (item != null) {
        return (
            <Card style={styles.card}>
                <Card.Title title={item.nombre} />
                <Card.Cover source={require('./imagenes/40Años.png')} />
                <Card.Content>
                    <Text style={styles.text}>{item.descripcion}</Text>
                </Card.Content>
            </Card>
        );
    }
    return <View />;
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
    text: { marginTop: 20 }
});

export default Home;