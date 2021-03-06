import React from 'react'
import ReactDOM from 'react-dom'
import Otsikko from './Otsikko'
import Sisalto from './Sisalto'

const Kurssi = ({kurssi}) => {
  return (
      <div>
        <Otsikko otsikko={kurssi.nimi} />
        <Sisalto osat={kurssi.osat} />
      </div>
    )
}

export default Kurssi