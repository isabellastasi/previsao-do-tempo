import React, { Component } from 'react'
import './formulario.css'

export default class Formulario extends Component {
    constructor(props) {
        super(props);

        this.cidade = " ";
        this.temperature = " ";
        this.imageURL = "";
        this.localName = "";
        this.id = "";
        this.url = "";
        this.dataCompleta = "";
        this.backgroundcolor = "";
    }

    weatherForecast(evento) {

        evento.stopPropagation();

        let key = '71d469ad633462a165133b9c0d63b59f';
        let city = (this.cidade).replace(" ", "+");
        console.log(city)
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${key}`
        this.url = url
        console.log(this.url)
        this.fetchAPi()
    }

    getUserPosition(evento) {
        evento.stopPropagation();
        console.log("local usuario")

        navigator.geolocation.getCurrentPosition((pos) => {
            let lat = pos.coords.latitude;
            let long = pos.coords.longitude;
            let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=71d469ad633462a165133b9c0d63b59f`;
            this.url = url
            console.log(this.url)
            this.fetchAPi()
        });
    }

    fetchAPi() {
        console.log("Entrou na fetchAPI")
        console.log(this.url)
        fetch(this.url)

            .then((data) => {
                return data.json();
            })
            .then((data) => {
                let temperature = (data.main.temp).toFixed([1]);
                let id = data.weather[0].icon;
                let localName = data.name;
                let timezone = data.timezone * 1000;
                let dt = data.dt * 1000
                let sunrise = data.sys.sunrise * 1000
                let sunset = data.sys.sunset * 1000
               
                if (dt > sunrise && dt < sunset) {
                    console.log("dia")
                    this.backgroundcolor = "dia"
                }
                else {
                    console.log("noite")
                    this.backgroundcolor = "noite"
                }

                let d = new Date()
                let gtm =( Date.parse(d) + d.getTimezoneOffset()*60000);
                console.log(d,Date.parse(d),d.getTimezoneOffset()*60000,gtm);
                let novaData = new Date(gtm+timezone)
                let dia = novaData.getDate()
                let mes = novaData.getMonth()+1;
                let minutes = novaData.getMinutes()
                let hours = novaData.getHours();
                if(novaData.getMinutes()<10){
                   minutes = `0${novaData.getMinutes()}` 
                }
                if(novaData.getHours()<10){
                    hours = `0${novaData.getHours()}` 
                 }
        
                 var dataCompleta=`${dia}/${mes} ${hours}:${minutes}`
                console.log(dia, mes, hours,minutes )
            
                this.localName = localName;
                this.temperature = temperature
                this.id = id;
                this.dataCompleta = dataCompleta;

                return id
            })
            .then((id) => {
                this.icon(id)
            })
 
            .catch((err) => {
                this.localName = "Erro"
                this.imageURL = ""
                this.temperature = "-"
                this.criarCard()
            })
    }


    icon(id) {


        let imageURL = ` http://openweathermap.org/img/wn/${id}@2x.png`
        this.imageURL = imageURL
        console.log(imageURL)
        this.criarCard()
    }

    handleMudancaCidade(evento) {
        evento.stopPropagation();
        this.cidade = evento.target.value;
    }

    handleMeuLocal(evento) {
        evento.stopPropagation();
        this.weatherForecast(this.cidade);
    }

    criarCard() {
        this.props.criarCard(this.localName, this.temperature, this.imageURL, this.dataCompleta, this.backgroundcolor);
    }

    render() {
        return (
            <div className="formulario">
                <input id="campo" type="text" placeholder="Digite o nome da cidade" onChange={this.handleMudancaCidade.bind(this)} />
                <button className="botao" onClick={this.weatherForecast.bind(this)}> Ok </button>
                <button className="botao" onClick={this.getUserPosition.bind(this)}> Meu local </button>
            </div>
        )
    }

}