import Weather from './Components/WeatherForecast'
import Card from './Components/layout/Card.jsx'
import './App.css'

function App() {

 

  return (
    <div className="App">
      <Card>
      <Weather></Weather>
      </Card>
      <Card>
      <Weather></Weather>
      </Card>
      <Card>
      <Weather></Weather>
      </Card>
      <Card>
      <Weather></Weather>
      </Card>
    </div>
  );
}

export default App;
