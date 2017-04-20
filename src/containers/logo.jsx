// @flow

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import classNames from 'classnames'

class Logo extends Component {
  render () {
    const { isFetching } = this.props
    const logoClass = classNames('logo', {
      isFetching
    })

    return (
      <div className={logoClass}>
        <img src='assets/img/mirror-trefoil.jpg' />
      </div>
    )
  }
}

Logo.propTypes = {
  isFetching: PropTypes.bool.isRequired
}

export default connect(({ posts: { isFetching } }) => ({ isFetching }))(Logo)
