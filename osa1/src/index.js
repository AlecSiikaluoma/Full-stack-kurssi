import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const Statistics = ({stats}) => {
  if(stats.huono == 0 && stats.hyva == 0 && stats.neutraali == 0) {
    return (
      <div>
      <p>ei yhtään palautetta annettu</p>
      </div>
    )}
    return (
      <div>
        <table>
          <Statistic number={stats.hyva} text="hyvä" />
          <Statistic number={stats.neutraali} text="neutraali" />
          <Statistic number={stats.huono} text="huono" />
          <Statistic number={stats.hyva * 1 + stats.huono * (-1) / (stats.hyva + stats.neutraali + stats.huono) } text="keskiarvo" />
          <Statistic number={(stats.hyva / (stats.hyva + stats.neutraali + stats.huono)) * 100 + " %"} text="positiivisia" />
        </table>
      </div>
    )
}

const Statistic = ({number, text}) => (
    <tr>
        <td>
          {text}
        </td>
        <td>
          {number}
        </td>
    </tr>
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    }
  }

  klik = (arvo) => {
      return () => {
        var object = {}
        object[arvo] = this.state[arvo] + 1
        this.setState(object)
      }
  }


  klikHyva = () => {
    this.setState({
      hyva: this.state.hyva + 1
    })
  }

  klikNeutraali = () => {
    this.setState({
      neutraali:this.state.neutraali + 1
    })
  }

  klikHuono = () => {
    this.setState({
      huono:this.state.huono + 1
    })
  }


  render() {
    return (
      <div>
        <div>
          <h1>anna palautetta</h1>
          <Button handleClick={this.klik('hyva')} text="hyvä" />
          <Button handleClick={this.klik('neutraali')} text="neutraali" />
          <Button handleClick={this.klik('huono')} text="huono" />
          <h1>statistiikka</h1>
          <Statistics stats={this.state} />
        </div>
      </div>
    )
  }
}







ReactDOM.render(
  <App />,
  document.getElementById('root')
)
