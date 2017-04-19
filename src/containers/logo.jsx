// @flow

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router'

import classNames from 'classnames'

class Logo extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { isFetching } = this.props
    const logoClass = classNames('logo', {
      isFetching
    })

    return (
      <div className={ logoClass }>
        <img src='assets/img/mirror-trefoil.jpg' />
      </div>
    )
  }
}


export default connect(({ posts: { isFetching } }) => ({ isFetching }))(Logo)
