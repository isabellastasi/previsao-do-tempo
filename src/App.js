
import React, { Component } from 'react'
import Formulario from './Components/Formulario/formulario.jsx'
import ListaCards from './Components/ListaCards/listaCards.jsx'
import './App.css'


export default class App extends Component {
constructor(){
  super();
  this.state = {
      cidades: []
  }
}

  criarCard(cidade, temperatura, icone, dataCompleta, backgroundcolor){

    const novaPrevisao= {cidade, temperatura, icone, dataCompleta, backgroundcolor}
    const novoArrayCidades = [... this.state.cidades, novaPrevisao]
    const atualizacao = {
      cidades: novoArrayCidades
    }

    this.setState(atualizacao)
    console.log(atualizacao)
    
  }

  deletarCard(index){
    let arrayPrevisao = this.state.cidades
    arrayPrevisao.splice(index,1);
    this.setState({cidades: arrayPrevisao})
  }

render(){

  return (
    <div className="App">

        <Formulario 
        criarCard={this.criarCard.bind(this)}/>
        <ListaCards 
        apagarCard={this.deletarCard.bind(this)}
        cidades={this.state.cidades}/>

    </div>
  );
}
}