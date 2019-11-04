import React from 'react'
import { push } from 'connected-react-router'

import { connect } from 'react-redux'

const Home = props => (
  <div>
    <h1>Home</h1>
    <p>Count: {props.count}</p>

    <p>
      <button onClick={props.increment}>Increment</button>
      <button onClick={props.incrementAsync} disabled={props.isIncrementing}>
        Increment Async
      </button>
    </p>

    <p>
      <button onClick={props.decrement}>Decrement</button>
      <button onClick={props.decrementAsync} disabled={props.isDecrementing}>
        Decrement Async
      </button>
    </p>

    <p>
      <button onClick={() => props.changePage()}>
        Go to about page via redux
      </button>
    </p>
  </div>
)

const mapStateToProps = ({ main }) => ({
  count: main.count,
  isIncrementing: main.isIncrementing,
  isDecrementing: main.isDecrementing
})

export default connect(
  mapStateToProps,
  {
    changePage: () => push('/about-us')
  }
)(Home)
