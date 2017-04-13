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
        { navItems.map(navItem) }
      </nav>
    )
  }
}

const navItem = ({ link, title }, index) => (
  <Link to={ link } key={ `nav-item-${index}` }>{ title }</Link>
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
