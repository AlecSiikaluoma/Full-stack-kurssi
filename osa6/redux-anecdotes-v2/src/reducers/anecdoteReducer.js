import { createStore, combineReducers } from 'redux'
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000*Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdotesReducer = (store = [], action) => {
  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !==action.anecdote.id)
    const voted = store.find(a => a.id === action.anecdote.id)

    return [...old, { ...voted, votes: voted.votes+1} ]
  }
  if (action.type === 'CREATE') {

    return [...store, { content: action.content.content, id: action.content.id, votes:action.content.votes }]
  }

  if(action.type === 'INIT') {
    return action.data
  }

  return store
}

const notificationReducer = (store = { initial: 'PLACE HOLDER', notification_hidden: true }, action) => {
  if (action.type === 'TOGGLE_NOTIFICATION') {
    return { initial: action.content, notification_hidden: !store.notification_hidden }
  }

  if (action.type === 'CHANGE_NOTIFICATION') {
    return { inital: action.content, notification_hidden: store.notification_hidden}
  }
  return store
}

const filterReducer = (store = { filter: ''}, action) => {
  if (action.type === 'SET_FILTER') {
    return { filter: action.filter }
  }
  return store
}


const reducer = combineReducers({
  anecdotes: anecdotesReducer,
  notification: notificationReducer,
  filter: filterReducer
})

export const anecdotesInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export const vote = (a) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.vote(a)
    dispatch({
      type: 'VOTE',
      anecdote: a
    })
  }
}

export const notify = (content) => {
  return (dispatch) => {
    dispatch({
      type: 'TOGGLE_NOTIFICATION',
      content: content
    })
    setTimeout(() => {
      dispatch({
        type: 'TOGGLE_NOTIFICATION',
        content: ''
      })
    }, 5000)
  }
}

export const changeFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    filter
  }
}

export const changeNotification = (content) => {
  return {
    type: 'CHANGE_NOTIFICATION',
    content
  }
}

export const create = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE', 
      content: anecdote
    })
  }
} 

export const toggleNotification = (content) => {
  return {
      type: 'TOGGLE_NOTIFICATION',
      content
  }
}

export default reducer