import React from 'react'
import { Link } from 'react-router'

import FeaturedImage from './components/featured-image.js'
import Logo from './containers/logo.jsx'
import Nav from './containers/nav.jsx'

class App extends React.Component {
  render() {
    return (
      <div className='site-wrapper'>
        <header>
          <FeaturedImage />
          <Nav />
        </header>
        <main>
          { this.props.children }
        </main>
        <footer>
          <Logo />
        </footer>
      </div>
    )
  }
}

export default App
