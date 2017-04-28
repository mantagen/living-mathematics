// @flow

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router'

import { fetchNavIfNeeded } from './../actions/nav-actions'

import LoadingMoon from './../components/loading-moon'

class Nav extends Component {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(fetchNavIfNeeded())
  }

  render () {
    const { isFetching, navItems } = this.props
    return (
      <nav>
        <ul className='nav'>
          {
            isFetching
              ? <div className='nav__loading'><LoadingMoon /></div>
              : navItems.map(navItem)
          }
        </ul>
      </nav>
    )
  }
}

Nav.propTypes = {
  navItems: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

const navItem = ({ link, title }, index) => (
  <li className='nav__item' key={`nav__item--${index}`}>
    <Link
      to={link}
      className='nav__link'
      activeClassName='nav__link--active'
    >{ title }</Link>
  </li>
)

function mapStateToProps ({nav}) {
  const {
    isFetching,
    items
  } = nav || {
    isFetching: true,
    items: []
  }

  return {
    isFetching,
    navItems: items
  }
}

export default connect(mapStateToProps)(Nav)
