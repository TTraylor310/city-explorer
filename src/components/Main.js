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
      // xweather: [],
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

      // let weatherURL = `${process.env.REACT_APP_SERVER}/weather?${this.state.city}`;
      // let weatherData = await axios.get(weatherURL);

      this.setState({
        cityData: cityData.data,
        error: false,
        errorMessage: '',
        showData: true,
        // weather: weatherData.data,
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
    console.log(this.state.weather);

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
          <section className="data1">
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
            {
              this.state.showData &&
              this.state.weather.map(val => {
                return <p key={val.date}>{val.date}</p>
              })
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