// @flow

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { fetchPostsIfNeeded, selectPost } from '../actions/post-actions.js'

import Content from '../components/content.js'

class Post extends Component {
  componentDidMount () {
    const { dispatch, params: { postType, slug } } = this.props
    const params = { postType, query: { slug } }
    dispatch(selectPost({ postType, slug }))
    dispatch(fetchPostsIfNeeded(params))
  }

  componentDidUpdate (prevProps) {
    const { params: { slug: prevSlug } } = prevProps
    const { dispatch, params: { postType, slug: newSlug } } = this.props
    const slugChanged = newSlug !== prevSlug
    slugChanged && dispatch(selectPost({ postType, slug: newSlug }))
    slugChanged && dispatch(fetchPostsIfNeeded({ postType, query: { slug: newSlug } }))
  }

  render () {
    return <Content {...this.props} />
  }
}

Post.propTypes = {
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

export default connect(mapStateToProps)(Post)
