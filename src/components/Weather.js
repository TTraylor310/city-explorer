import React from 'react';

class Weather extends React.Component{
  
  render(){
    let weatherArray = this.props.datasW.map(v => (
      <>  
        <p key={v.app_temp}>The temperature is {v.app_temp} and is {v.description}</p>
        <p key={v.app_temp++}>Sunrise: {v.sunrise} and Sunset: {v.sunset}</p>
      </>
    ))

    return(
    <>
      {weatherArray}
    </>
    )
  }
}

export default Weather;