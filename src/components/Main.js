import React from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import '../css/style.css';
import Movie from './Movie.js';
import Weather from './Weather.js';


class Main extends React.Component{

  constructor (props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
      mapData:[],
      error: false,
      errorMessage: '',
      showData: false,
      weather: [],
      moviesData: [],
      key1: 34134,
      key2: 13245,
    }
  }

  handleInput = (e) => {
    e.preventDefault();
    this.setState ({
      city: e.target.value
    })
  }


  getCityData = async (e) => {
    e.preventDefault();

    try{
      let cityURL = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;
      let cityData = await axios.get(cityURL);

      const weatherURL = `${process.env.REACT_APP_SERVER}/weather?lat=${cityData.data[0].lat}&lon=${cityData.data[0].lon}`;
      const weatherData = await axios.get(weatherURL);

      const moviesURL = `${process.env.REACT_APP_SERVER}/movies?city=${this.state.city}`;
      const moviesData = await axios.get(moviesURL);

      this.setState({
        cityData: cityData.data,
        showData: true,
        weather: weatherData.data,
        lat: cityData.data[0].lat,
        lon: cityData.data[0].lon,
        moviesData: moviesData.data,
      })

    }catch(error){
      this.setState({
        error: true,
        errorMessage: `Error: Unable to geocode.`
      })
    }
  }
  


  render () {
    console.log(this.state.moviesData);
    let nameName = this.state.cityData.map (val => val.display_name);

    // line 121 for display for <Weather /> need key and info
    // let wetSunrise = this.state.weather.map (val => val.sunrise);
    // let wetSunset = this.state.weather.map (val => val.sunset);
    // let wetApp_temp = this.state.weather.map (val => val.app_temp);
    // let wetDescription = this.state.weather.map (val => val.description);

    return(
      <>
        <main className="main1">
          {
          !this.state.showData &&
          <p className="question1">Enter any city name?</p>
          }
          <form onSubmit={this.getCityData} className="form1">
            <label>
              <input type="text" onInput={this.handleInput} />
            </label>
            <button type='submit'>Explore!</button>
          </form>
          <div>
            {
              this.state.showData &&
              <Alert variant="danger">
                <Alert.Heading>{this.state.errorMessage}</Alert.Heading>
                  <p className="question2">
                    Fill in another city?
                  </p>
              </Alert>
            }
          </div>
          <section className="data1"> {/* City,Lat, Lon shown */}
              {
              this.state.showData &&
              <p key={`${this.state.key1}`}>{nameName[0]}</p>
              }
            <ul>
              {
                this.state.showData &&
                <li key={`${this.state.lat}`} className="bullets1">Latitude: {this.state.lat}; Longitude: {this.state.lon}</li>
              }
            </ul>
            {/* {
              this.state.showData &&
              <p key={`${this.state.weather.app_temp}`} className="temp1">Sunrise: {wetSunrise}; Sunset: {wetSunset}</p>
            }
            {
              this.state.showData &&
              <p key={`${this.state.key2}`} className="temp3">Temperature: {wetApp_temp}, {wetDescription}</p>
            } */}
            {/* { 
              this.state.showData &&
              <Weather datasW={this.state.weather} />
            } */}
          </section>
          <article className="img1">
              {
              this.state.showData &&
              <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.lat},${this.state.lon}&zoom=9&size=400x400&format=jpeg`} alt="testing" />
              }
          </article>
          
            <section>
              {
              this.state.showData &&
              <h3>Here are some movies you might enjoy based on the location: {this.state.city}</h3>
              }
              <ul>
              
              { 
                  this.state.showData &&
                  <Movie datas={this.state.moviesData} />
              }
              
              </ul>
            </section>
          
        </main>
      </>
    )
  };

}

export default Main;