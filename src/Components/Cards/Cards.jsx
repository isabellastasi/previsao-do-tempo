import React from 'react'
import './style.css'


export default class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.localTime = " ";

    }

    apagar() {
        const indice = this.props.indice;
        this.props.apagarCard(indice);
    }
    render() {
        return (
            <div className="forecast" id={this.props.backgroundcolor}>


                <button id="delete" onClick={this.apagar.bind(this)}>x</button>
                <h3 id={this.props.cidade}> {this.props.cidade}</h3>
                <h5>{this.props.dataCompleta}</h5>
                <h3>{this.props.temperatura}°C</h3>
                <img id="weather" src={this.props.icone} alt="Icone do Clima" />

            </div>
        )

    }
}