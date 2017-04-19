// @flow

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router'

import { fetchNavIfNeeded } from './../actions/nav-actions.js'

class Nav extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(fetchNavIfNeeded())
  }

  render () {
    const { navItems } = this.props
    return (
      <nav>
        <ul className='nav'>
          { navItems.map(navItem) }
        </ul>
      </nav>
    )
  }
}

const navItem = ({ link, title }, index) => (
  <li className='nav__item' key={ `nav__item--${index}` }>
    <Link
      to={ link }
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
    items: [],
  }

  return {
    isFetching,
    navItems: items
  }
}

export default connect(mapStateToProps)(Nav)
// export default connect((({ nav }) => ({ navItems: nav.items })))(Nav)
