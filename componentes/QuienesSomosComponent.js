import React, { Component } from 'react';
import { ScrollView, View, Image, StyleSheet } from 'react-native';
import { Card, Text, List, Divider } from 'react-native-paper';
import { ACTIVIDADES } from '../comun/actividades';

// Tarjeta superior estática
function Historia() {
    return (
        <Card style={styles.card}>
            <Card.Title title="Un poquito de historia" />
            <Card.Content>
                <Text style={styles.texto}>El nacimiento del club de montaña Gaztaroa se remonta a la primavera de 1976 cuando jóvenes aficionados a la montaña y pertenecientes a un club juvenil decidieron crear la sección montañera de dicho club. Fueron unos comienzos duros debido sobre todo a la situación política de entonces. Gracias al esfuerzo económico de sus socios y socias se logró alquilar una bajera. Gaztaroa ya tenía su sede social.</Text>
                <Text style={styles.texto}>Desde aquí queremos hacer llegar nuestro agradecimiento a todos los montañeros y montañeras que alguna vez habéis pasado por el club aportando vuestro granito de arena.</Text>
                <Text style={styles.texto}>Gracias!</Text>
            </Card.Content>
        </Card>
    );
}

// Clase principal
class QuienesSomos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actividades: ACTIVIDADES
        };
    }

    render() {
        return (
            <ScrollView>
                <Historia />
                <Card style={styles.card}>
                    <Card.Title title="Actividades y recursos" />
                    <Card.Content>
                        {this.state.actividades.map((item, index) => (
                            <View key={index}>
                                <List.Item
                                    title={item.nombre}
                                    description={item.descripcion}
                                    titleNumberOfLines={0}
                                    descriptionNumberOfLines={10}
                                    left={(props) => (
                                        <Image source={require('./imagenes/40Años.png')} style={styles.imagen} />
                                    )}
                                />
                                <Divider />
                            </View>
                        ))}
                    </Card.Content>
                </Card>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    card: { margin: 10 },
    texto: { marginBottom: 10 },
    imagen: { width: 40, height: 40, alignSelf: 'center', margin: 10 }
});

export default QuienesSomos;