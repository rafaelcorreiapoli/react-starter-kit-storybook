import React, { PropTypes } from 'react'

class Counter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      count: 0
    }
  }

  incrementCounter() {
      let { count } = this.state;
      const { estado } = this.props;

      if (estado === 'normal') {
        count++;
      } else if (estado === 'invertido') {
        count--;
      }

      this.setState({
        count
      })
  }

  render () {

    const { count } = this.state
    return (
      <div onClick={this.incrementCounter.bind(this)}>Count: {count}</div>
    )
  }
}

export default Counter;
