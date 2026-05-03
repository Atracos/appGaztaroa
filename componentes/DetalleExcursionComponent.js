import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import { baseUrl } from '../comun/comun';

function formatearFecha(dia) {
    if (!dia) return '';
    const fecha = new Date(dia);
    const opciones = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return fecha.toLocaleDateString('es-ES', opciones).replace(',', '');
}

function mostrarValoracion(valoracion) {
    const max = 5;
    let estrellas = '';
    for (let i = 0; i < max; i++) {
        estrellas += i < valoracion ? '\u2605' : '\u2606';
    }
    return estrellas;
}

function RenderExcursion(props) {
    const excursion = props.excursion;
    if (!excursion) {
        return (
            <View style={{ padding: 20 }}>
                <Text>Cargando...</Text>
            </View>
        );
    }
    return (
        <Card style={styles.card}>
            <ImageBackground source={{ uri: baseUrl + excursion.imagen }} style={styles.imageBackground}>
                <View style={styles.overlay}>
                    <Text style={styles.tituloWhite}>{excursion.nombre}</Text>
                </View>
            </ImageBackground>
            <Card.Content>
                <Text style={styles.descripcion}>{excursion.descripcion}</Text>
                <View style={styles.iconoContainer}>
                    <IconButton
                        icon={props.favorita ? 'heart' : 'heart-outline'}
                        iconColor="#f50"
                        size={28}
                        onPress={() => props.onPress()}
                    />
                </View>
            </Card.Content>
        </Card>
    );
}

function RenderComentario(props) {
    const comentarios = props.comentarios;

    const renderCommentarioItem = ({ item, index }) => {
        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comentario}</Text>
                <Text style={{ fontSize: 12 }}>{mostrarValoracion(item.valoracion)}</Text>
                <Text style={{ fontSize: 12 }}>{`-- ${item.autor}, ${formatearFecha(item.dia)}`}</Text>
            </View>
        );
    };

    return (
        <Card style={styles.card}>
            <Card.Title title="Comentarios" />
            <Card.Content>
                <FlatList
                    data={comentarios}
                    renderItem={renderCommentarioItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </Card.Content>
        </Card>
    );
}

class DetalleExcursion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comentarios: []
        };
    }

    componentDidMount() {
        this.fetchComentarios();
    }

    fetchComentarios = async () => {
        try {
            const response = await fetch(`${baseUrl}comentarios`);
            const comentarios = await response.json();
            this.setState({ comentarios });
        } catch (error) {
            console.error('Error fetching comentarios:', error);
        }
    }

    render() {
        const { excursionId } = this.props.route?.params || {};
        const excursions = this.props.excursiones || [];
        const favoritos = this.props.favoritos || [];
        const marcarFavorito = this.props.marcarFavorito || (() => {});
        return (
            <ScrollView>
                <RenderExcursion
                    excursion={excursions[+excursionId]}
                    favorita={favoritos.some((el) => el === excursionId)}
                    onPress={() => marcarFavorito(excursionId)}
                />
                <RenderComentario
                    comentarios={this.state.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    card: { margin: 10 },
    imageBackground: { height: 200, justifyContent: 'flex-end' },
    overlay: { backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: 10 },
    tituloWhite: { fontSize: 24, fontWeight: 'bold', color: 'white', textAlign: 'center' },
    descripcion: { marginTop: 20, marginBottom: 20 },
    iconoContainer: { alignItems: 'center', marginBottom: 8 }
});

export default DetalleExcursion;
