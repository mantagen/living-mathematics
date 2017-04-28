import React from 'react'

import Nav from './containers/nav'

import FeaturedImage from './components/featured-image'
import Logo from './components/logo'

class App extends React.Component {
  render () {
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
