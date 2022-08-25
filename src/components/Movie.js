import React from 'react';

class Movie extends React.Component{

  render (){
    let movieArray = this.props.datas.map((v) => (
      <li key={v.id}>{v.title}</li>

    ))




    return(
      <>
      {movieArray}
      </>
    )
  };
}

export default Movie;
