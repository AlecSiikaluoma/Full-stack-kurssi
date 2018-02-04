import React from 'react'
import ReactDOM from 'react-dom'


const Osa = ({osa}) => {
  return(
      <div>
        <p>{osa.nimi} {osa.tehtavia}</p>
      </div>
    )
}

export default Osa