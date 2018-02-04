import React from 'react'
import axios from 'axios'
import personService from '../services/persons'


  const Person = ({person, deletePerson}) => (
    <div>
      {person.name} - {person.number} <button onClick={deletePerson}>Poista</button>
    </div>
  ) 

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="error">
        {message}
      </div>
    )
  }


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber:'',
      filter:'',
      notification:null
    }
  }


  addName = (event) => {
    event.preventDefault()

    const same = this.state.persons.filter(x=>x.name==this.state.newName)

      const newNameObject = {
        name: this.state.newName,
        number: this.state.newNumber
      }

    if(same == 0) {

      const ps = this.state.persons.concat(newNameObject)

      axios.post('http://localhost:3001/persons', newNameObject)
        .then(response => {
             this.setState({
                persons: this.state.persons.concat(response.data),
                newName: '',
                newNumber: '',
                notification:"Henkilö " + this.state.newName + " lisättiin onnistuneesti."
              })
              setTimeout(() => {
                this.setState({notification: null})
              }, 5000)
        })

    } else {
      if (window.confirm(this.state.newName + " on jo luettelossa, korvaanko numero uudella")) { 
        personService.update(this.state.persons.filter(x=>x.name==this.state.newName).map(x=>x.id), newNameObject).then(response => {
          const newPersons = this.state.persons
          const newP = newPersons.find(x=>x.name==this.state.newName)
          newP.number = this.state.newNumber
          this.setState({persons:newPersons, notification:this.state.newName + " numeroa muutettiin onnistuneesti."})
          setTimeout(() => {
            this.setState({notification: null})
          }, 5000)
        })
      }
    }

  }

  handleChange = (event) => {
    this.setState({newName:event.target.value})
  }

  handleNumberChange = (event) => {
    this.setState({newNumber:event.target.value})
  }

  handleFilter = (event) => {
    this.setState({filter:event.target.value})
  }

  componentWillMount() {
      personService.getAll().then(response => {
        this.setState({ persons: response.data })
      })
  }

  deletePerson = (id, name) => {
    return () => {
      if (window.confirm("poistetaanko " + name)) { 
        personService.deleteId(id).then(response => {
          const newPersons = this.state.persons.filter(x=>x.id != id)
          this.setState({persons:newPersons, notification:"Henkilö " + name + " poistettiin onnistuneesti"})
          setTimeout(() => {
            this.setState({notification: null})
          }, 5000)
        })
      }
    }
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2> 
        <Notification message={this.state.notification} />
        rajaa näytettäviä <input value={this.state.filter} onChange={this.handleFilter} /><br />
        <h3>Lisää uusi</h3>
        <form onSubmit={this.addName}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleChange} /><br />
            numero: <input value={this.state.newNumber} onChange={this.handleNumberChange} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        {this.state.persons.filter(p=>p.name.includes(this.state.filter)).map(p=> <Person person={p} deletePerson={this.deletePerson(p.id, p.name)} />)}
      </div>
    )
  }
}

export default App
