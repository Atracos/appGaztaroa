import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import { EXCURSIONES } from '../comun/excursiones';
import { COMENTARIOS } from '../comun/comentarios';

function RenderExcursion(props) {
    const excursion = props.excursion;
    if (excursion != null) {
        return (
            <Card style={styles.card}>
                <Card.Title title={excursion.nombre} />
                <Card.Cover source={require('./imagenes/40Años.png')} />
                <Card.Content>
                    <Text style={styles.descripcion}>{excursion.descripcion}</Text>
                    <View style={styles.iconoContainer}>
                        <IconButton
                            icon={props.favorita ? 'heart' : 'heart-outline'}
                            iconColor="#f50"
                            size={28}
                            onPress={() =>
                                props.favorita
                                    ? console.log('La excursión ya se encuentra entre las favoritas')
                                    : props.onPress()
                            }
                        />
                    </View>
                </Card.Content>
            </Card>
        );
    }
    return <View />;
}

function RenderComentario(props) {
    const comentarios = props.comentarios;

    const renderCommentarioItem = ({ item, index }) => {
        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comentario}</Text>
                <Text style={{ fontSize: 12 }}>{item.valoracion} Estrellas</Text>
                <Text style={{ fontSize: 12 }}>{`-- ${item.autor}, ${item.dia}`}</Text>
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
            excursiones: EXCURSIONES,
            comentarios: COMENTARIOS,
            favoritos: []
        };
    }

    marcarFavorito(excursionId) {
        this.setState({ favoritos: this.state.favoritos.concat(excursionId) });
    }

    render() {
        const { excursionId } = this.props.route.params;
        return (
            <ScrollView>
                <RenderExcursion
                    excursion={this.state.excursiones[+excursionId]}
                    favorita={this.state.favoritos.some((el) => el === excursionId)}
                    onPress={() => this.marcarFavorito(excursionId)}
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
    descripcion: { marginTop: 20, marginBottom: 20 },
    iconoContainer: { alignItems: 'center', marginBottom: 8 }
});

export default DetalleExcursion;