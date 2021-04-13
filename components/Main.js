import React, {useState} from 'react'
import axios from 'axios'

import Context from '../context'
import Header from './Header'
import Content from './White'
import WeatherSearch from './WeatherSearch'
import WeatherData from './WeatherData'
import Error from './error'
import DateTime from './DateTime'

const Main = () => {
    const [weather, setWeather] = useState();
    const [city, setCity] = useState();
    const [error, setError] = useState();
    const api_call = async (e) => {
        e.preventDefault();
        const location = e.target.elements.location.value;
        if (!location) {
            return setError("Please Enter the name of the city."), setWeather(null) 
            
        }
        const API_KEY = "1bb91dbb486e2ae602939728cca4ace7"
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;
        const request = await axios.get(url)
        setCity(request.data.name)
        setWeather(request.data.main)
        setError(null)
    };
    weather && console.log(weather);
    return(
        <div className="main">
            <Header />
            <Content> 
              <DateTime />
              <Context.Provider value = {{api_call, weather, city}}>
                <WeatherSearch />
                {weather && <WeatherData />}
                {error && <Error error = {error} />}
              </Context.Provider> 
            </Content>
        </div>
    );
};
export default Main;