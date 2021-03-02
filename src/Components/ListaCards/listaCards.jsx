import React, { Component } from 'react'
import Cards from '../Cards/Cards.jsx'
import './listaCards.css'

export default class ListaCards extends Component {



    render() {

        return (
            <ul className="lista-cards">
                {this.props.cidades.map((cidade, index) => {
                    return (
                        <li key={index}>
                            <Cards 
                                indice={index}
                                apagarCard={this.props.apagarCard}
                                cidade={cidade.cidade}
                                temperatura={cidade.temperatura}
                                icone={cidade.icone}
                                dataCompleta={cidade.dataCompleta}
                                backgroundcolor={cidade.backgroundcolor}
                            />
                        </li>
                    )
                }
                )}
            </ul>
        )
    }
}