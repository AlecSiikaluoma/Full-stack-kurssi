import React from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({text, votes}) => (
	<div>
	{text}<br />
    has {votes} votes
    </div>
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0
    }
    this.state.pisteet = { 0: 1, 1: 3, 2: 4, 3: 2, 4: 0, 5: 0} 
  }

  change = () => {
  	return this.setState({selected : Math.floor(Math.random() * 6) + 0 })
  }

  vote = (index) => {
      return () => {
      	const kopio = {...this.state.pisteet}
      	kopio[index] += 1
        this.setState({pisteet : kopio})
      }
  }

  max = () => Object.keys(this.state.pisteet).reduce((a, b) => this.state.pisteet[a] > this.state.pisteet[b] ? a : b);
  
  render() {
    return (
      <div>
      	<Anecdote text={this.props.anecdotes[this.state.selected]} votes={this.state.pisteet[this.state.selected]} />
        <br />
        <button onClick={this.vote(this.state.selected)}>vote</button><button onClick={this.change}>next anecdote</button>
        <h1>anecdote with most votes</h1>
        <Anecdote text={this.props.anecdotes[this.max()]} votes={this.state.pisteet[this.max()]} />
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
