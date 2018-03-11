import React from 'react'
import { changeFilter } from './../reducers/anecdoteReducer'
import { connect } from 'react-redux'

class Filter extends React.Component {

  handleChange = (event) => {
    // input-kentän arvo muuttujassa event.target.value
    event.preventDefault()
    this.props.changeFilter(event.target.value)
  }

  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={this.handleChange}/>
      </div>
    )
  }
}

export default connect(
  null,
  { changeFilter }
)(Filter)
