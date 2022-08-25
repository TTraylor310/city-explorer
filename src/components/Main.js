import React from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import '../css/style.css';


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
      let cityurl = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;
      let cityData = await axios.get(cityurl);

      this.setState({
        cityData: cityData.data,
        error: false,
        errorMessage: '',
        showData: true,
      })

      const url = `${process.env.REACT_APP_SERVER}/weather?city=${this.state.city}`;
      const response = await axios.get(url);
      this.setState({
        weather: response.data,
      })

    }catch(error){
      this.setState({
        error: true,
        errorMessage: `Error: Unable to geocode.`
      })
    }
  }
  


  render () {
    let nameName = this.state.cityData.map (val => val.display_name);
    let nameLat = this.state.cityData.map (val => val.lat);
    let nameLon = this.state.cityData.map (val => val.lon);
    console.log(this.state);
    let wetSunrise = this.state.weather.map (val => val.sunrise);
    let wetSunset = this.state.weather.map (val => val.sunset);
    let wetApp_temp =((this.state.weather.map (val => val.App_temp))*(9/5))+32;
    let wetDescription = this.state.weather.map (val => val.Description);
    


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
              <p key={`${nameName[0]}`}>{nameName[0]}</p>
              }
            <ul>
              {
                this.state.showData &&
                <li key={`${nameLat[0]}`} className="bullets1">Latitude: {nameLat[0]}; Longitude: {nameLon[0]}</li>
              }
            </ul>
            {/* HERE IS WHERE I"M PUTTING NEW DATA */}
            {
              this.state.showData &&
              <p key={`${this.state.weather.app_temp}`} className="temp1">Sunrise: {wetSunrise}; Sunset: {wetSunset}</p>
            }
            {
              this.state.showData &&
              <p key={`${this.state.city}`} className="temp1">Temperature: {wetApp_temp}, {wetDescription}</p>
            }
          </section>
          <article className="img1">
              {
              this.state.showData &&
              <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${nameLat[0]},${nameLon[0]}&zoom=9&size=400x400&format=jpeg`} alt="testing" />
              }
          </article>
        </main>
      </>
    )
  };

}

export default Main;