import React from 'react';
import axios from 'axios';

class Main extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
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

    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`
    let cityData = await axios.get(url);
    this.setState({
      cityData: cityData.data
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


    return(
      <>
        <main>
          <form onSubmit={this.getCityData}>
            <label>
              <input type="text" onInput={this.handleInput} />
            </label>
            <button type='submit'>Explore!</button>
          </form>
        </main>
        <section>
            {nameData2}
          <ul>
            {locDataDone2}
          </ul>
        </section>
        <article>
          <p>Location of map? Card?</p>
        </article>
      </>
    )
  };

}


export default Main;