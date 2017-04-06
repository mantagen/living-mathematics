import React from 'react'
import { Link } from 'react-router'

class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <nav>
            <Link to='/about' >About</Link>
            <Link to='/contact' >Contact</Link>
            <Link to='/posts' >Posts</Link>
          </nav>
        </header>
        { this.props.children }
      </div>
    )
  }
}

export default App
