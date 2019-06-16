//import the package
import React from "react";

import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "0acbc89a9c3ec958d9353845b342fcc7";

// initialise the components
class App extends React.Component{

  state = {
    temperature:undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  //to avoid full page refresh, give an argument e(event object
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;//va;ue is whatever we type in input
    const country = e.target.elements.country.value;

    //async await makes web requests easy
    const api_call = await fetch('http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}', { credentials: 'include'});
    //convert the response to json format
    const data = await api_call.json();
    if(city && country){
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    }else{
      console.log(data);
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the values"
      });
    }
  }

  //display the data using render method
  render() {
    return (
        <div>
          <div className="wrapper">
            <div className="main">
              <div className="container">
                <div className="row">
                  <div className="col-xs-5 title-container">
                    <Titles />
                  </div>
                  <div className="col-xs-7 form-container">
                    <Form getWeather={this.getWeather} />
                    <Weather
                        temperature={this.state.temperature}
                        humidity={this.state.humidity}
                        city={this.state.city}
                        country={this.state.country}
                        description={this.state.description}
                        error={this.state.error}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
};

//make this component(App) available for others to imoport
export default App;
