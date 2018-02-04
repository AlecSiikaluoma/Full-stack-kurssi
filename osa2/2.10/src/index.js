import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

import axios from 'axios'

axios.get('http://localhost:3001/notes').then(response => {
  const notes = response.data
  console.log(notes)
})



ReactDOM.render(<App />, document.getElementById('root'));