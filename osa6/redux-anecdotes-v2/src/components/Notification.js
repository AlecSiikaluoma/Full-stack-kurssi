import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    const notification = this.props.notification

    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    if(!notification.notification_hidden && notification.initial != '') {
      return (
        <div style={style}>
           { notification.initial }
        </div>
      )
    }
    return <div></div>
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}


const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification
