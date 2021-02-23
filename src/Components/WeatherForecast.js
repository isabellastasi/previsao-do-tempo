import React from 'react'
import './style.css'

export default class Weather extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            city: "",
            temperature: "",
            weatherType: "",
            imageURL: "",
        }

        this.weatherForecast = this.weatherForecast.bind(this)
        this.getUserPosition = this.getUserPosition.bind(this)
    }


    weatherForecast() {
        document.getElementById('cityName').value = '';
        let key = '71d469ad633462a165133b9c0d63b59f';
        let city = (this.state.city).replace(" ", "+");
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${key}`
        this.fetchAPi(url);

    }

    getUserPosition() {

        document.getElementById('cityName').value = '';
        this.setState({ city: "" });
        let url;
        navigator.geolocation.getCurrentPosition((pos) => {
            let lat = pos.coords.latitude;
            let long = pos.coords.longitude;
            url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=71d469ad633462a165133b9c0d63b59f`;
            this.fetchAPi(url);
        });
    }

    fetchAPi(url) {
        console.log(url)

        fetch(url)
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                let temperature = (data.main.temp).toFixed([1]);
                let id = data.weather[0].icon;

                this.setState({ temperature })

                console.log(this.state.id)
                this.setState({ id })
                this.icon(id);
            })
            .catch((err) => {

            })

    }

    icon(id) {

        let imageURL = `http://openweathermap.org/img/wn/${id}@2x.png`
        this.setState({ imageURL })

    }


    render() {
        return (

            <div id="tracker">
                <header>
                    <div>
                        <label id="Name"> Cidade: </label>
                        <input id="cityName" type="text" onChange={(event) => { this.setState({ city: event.target.value }) }}></input>
                        <input id="botao" type="button" value="Ok" onClick={this.weatherForecast}></input>
                        <input id="botao" type="button" value="Meu local" onClick={this.getUserPosition}></input>
                    </div>

                </header>


                <div id="forecast">

                    <h3 id="city"> {this.state.city}</h3>

                    <img id="weather" src={this.state.imageURL} alt="Icone do Clima"></img>
                    <h3>{this.state.temperature}°C</h3>

                </div>
            </div>
        


        )

    }
}