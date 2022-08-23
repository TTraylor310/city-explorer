import React from 'react';
import axios from 'axios';
// import Alert from 'react-bootstrap/Alert';


class Main extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
      mapData:[],
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

      let cityurl = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`
      let cityData = await axios.get(cityurl);
      
      let mapurl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=47.6038321,-122.3300624&zoom=9&size=400x400&format=jpeg`
      // let mapData = await axios.get(mapurl);
  
      this.setState({
        cityData: cityData.data,
        mapData: mapurl,
        error: false,
        errorMessage: '',
      })

    }catch(error){

      this.setState({
        error: true,
        errorMessage: `Error: Unable to geocode.`
      })

    }

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

    let imageDisplay = this.state.mapData.map( val => {
      return <img src={val} alt="testing">Test Location</img>
    })

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

            {/* <Alert variant="danger">
              <Alert.Heading>{this.state.errorMessage}</Alert.Heading>
                <p>
                  Aww yeah, you successfully read this important alert message. This
                  example text is going to run a bit longer so that you can see how
                  spacing within an alert works with this kind of content.
                </p>
                <hr />
                <p className="mb-0">
                  Whenever you need to, be sure to use margin utilities to keep things
                  nice and tidy.
                </p>
            </Alert> */}

          </section>
          <article>
            <p>Location of map? Card?</p>
            {console.log(this.state.mapData)}
            {/* <img src={(this.state.mapData)} alt="testing">Test Location</img> */}
            {imageDisplay}
          </article>
        </main>
      </>
    )
  };

}


export default Main;