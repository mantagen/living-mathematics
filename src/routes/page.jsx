// @flow

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { fetchPostsIfNeeded, selectPost } from '../actions/post-actions.js'

import Content from '../components/content.js'

const slugger = props => props.route.slug || props.params.slug

class Page extends Component {
  componentDidMount () {
    const { dispatch } = this.props
    const slug = slugger(this.props)
    const params = { postType: 'pages', query: { slug } }
    dispatch(selectPost({ postType: 'pages', slug }))
    dispatch(fetchPostsIfNeeded(params))
  }

  componentDidUpdate (prevProps) {
    const { dispatch } = this.props
    const prevSlug = slugger(prevProps)
    const newSlug = slugger(this.props)
    const slugChanged = newSlug !== prevSlug
    slugChanged && dispatch(selectPost({ postType: 'pages', slug: newSlug }))
    slugChanged && dispatch(fetchPostsIfNeeded({ postType: 'pages', query: { slug: newSlug } }))
  }

  render () {
    return <Content {...this.props} />
  }
}

Page.propTypes = {
  post: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps ({posts}) {
  const { error, selectedPost: { postType, slug }, postsByType, isFetching } = posts
  let post = {}
  if (postsByType[postType]) {
    post = postsByType[postType][slug] || {}
  }

  return {
    error,
    isFetching,
    post
  }
}

export default connect(mapStateToProps)(Page)
