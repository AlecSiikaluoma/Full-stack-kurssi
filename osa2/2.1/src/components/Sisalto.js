import React from 'react'
import ReactDOM from 'react-dom'
import Osa from './Osa'

const Sisalto = ({osat}) => {
  const yhteensa = () => {
    return osat.map(x=>x.tehtavia).reduce((a, b) => a + b, 0);
  }
  return(
      <div>
          {osat.map(osa =><Osa key={osa.id} osa={osa} />)}
          <p>yhteensä {yhteensa()} tehtävää</p>
      </div>
    )
}


export default Sisalto