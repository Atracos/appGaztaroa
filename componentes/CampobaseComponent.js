import React, { Component } from 'react';
import { View } from 'react-native';
import Calendario from './CalendarioComponent';
import DetalleExcursion from './DetalleExcursionComponent';
import { EXCURSIONES } from '../comun/excursiones';

class Campobase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            excursiones: EXCURSIONES,
            seleccionExcursion: null // Almacena el ID de la excursión seleccionada [cite: 447-450]
        };
    }

    onSeleccionExcursion(excursionId) {
        this.setState({ seleccionExcursion: excursionId });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {/* Renderiza el detalle filtrando la excursión por el ID del estado [cite: 460] */}
                <DetalleExcursion 
                    excursion={this.state.excursiones.filter((excursion) => excursion.id === this.state.seleccionExcursion)[0]} 
                />
                {/* Pasa la función de selección al Calendario [cite: 462] */}
                <Calendario 
                    excursiones={this.state.excursiones} 
                    onPress={(excursionId) => this.onSeleccionExcursion(excursionId)} 
                />
            </View>
        );
    }
}

export default Campobase;