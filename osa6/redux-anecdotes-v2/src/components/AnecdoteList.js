import React from 'react'
import { create, toggleNotification, vote, notify } from './../reducers/anecdoteReducer'
import { connect } from 'react-redux'

const anecdotesToShow = (anecdotes, filter) => {
  return anecdotes.filter(a => a.content.includes(filter.filter)).sort((a, b) => b.votes - a.votes)
}

class AnecdoteList extends React.Component {
  
  handleClick = async (e, a) => {
    e.preventDefault()

    this.props.vote(a)
    
    this.props.notify(a.content)
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>

        { this.props.anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={(e) => this.handleClick(e, anecdote)}>
                vote
              </button>
            </div>
          </div>
        ) }

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    anecdotes: anecdotesToShow(state.anecdotes, state.filter),
    notification: state.notification
  }
}

export default connect(
  mapStateToProps,
  { create, toggleNotification, vote, notify }
)(AnecdoteList)
