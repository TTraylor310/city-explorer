import React from 'react';
import axios from 'axios';

class Main extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
      // mapData:[],
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
    let cityurl = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`
    let cityData = await axios.get(cityurl);
    
    // let mapurl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=47.6038,-122.3300&zoom=8&format=jpeg`
    // let mapData = await axios.get(mapurl);

    // let mapurl2='https://maps.locationiq.com/v3/staticmap?key=pk.16414f51095aea34a005c75b672de403&center=47.6038321,-122.3300624&zoom=9&size=400x600&format=png'


    this.setState({
      cityData: cityData.data,
      // mapData: mapData.data
    })
  }

 
  render () {

    let nameData = this.state.cityData.map( (val, idx) => {
      return <p key={idx}>Name: {val.display_name}</p>
    })
    let nameData2 = nameData[0];
    let locDataDone = this.state.cityData.map( (val, idx) => {
      return <li key={idx}>Latitude: {val.lat}; Longitude: {val.lon}</li>
    })
    let locDataDone2 = locDataDone[0];

    console.log(this.state.cityData);
    // console.log(this.state.mapData);

    return(
      <>
        <main>
          <form onSubmit={this.getCityData}>
            <label>
              <input type="text" onInput={this.handleInput} />
            </label>
            <button type='submit'>Explore!</button>
          </form>
          <section>
              {nameData2}
            <ul>
              {locDataDone2}
            </ul>
          </section>
          <article>
            <p>Location of map? Card?</p>
            {/* <img src={this.mapData} alt="testing">Test Location</img> */}
          </article>
        </main>
      </>
    )
  };

}


export default Main;