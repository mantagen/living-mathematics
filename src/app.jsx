import React from 'react'
import { Link } from 'react-router'

import Nav from './containers/nav.jsx'

class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <Nav />
        </header>
        { this.props.children }
      </div>
    )
  }
}

export default App
