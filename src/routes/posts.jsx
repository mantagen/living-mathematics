// @flow

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { fetchPostsIfNeeded } from '../actions/post-actions.js'

import PostList from '../components/post-list.js'
import LoadingMoon from '../components/loading-moon.js'

class Posts extends Component {
  componentDidMount () {
    const { activeQuery, dispatch, params: { postType } } = this.props
    dispatch(fetchPostsIfNeeded(Object.assign({}, activeQuery, { postType, query: {} })))
  }

  componentDidUpdate (prevProps) {
    const { activeQuery, dispatch, params: { postType } } = this.props
    if (postType !== prevProps.params.postType) {
      dispatch(fetchPostsIfNeeded(Object.assign({}, activeQuery, { postType, query: {} })))
    }
  }

  render () {
    const { postsByType, error, isFetching, params: { postType } } = this.props
    const postsObject = postsByType[postType] || {}
    const posts = Object.keys(postsObject).map(slug => postsObject[slug]).filter(post => !!post)
    return (
      <div>
        {isFetching && posts.length === 0 &&
          <LoadingMoon />
        }
        {!isFetching && error &&
          <h2>{error}</h2>
        }
        {!isFetching && !error && posts.length === 0 &&
          <h2>No posts found.</h2>
        }
        {posts.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <PostList posts={posts} type={postType} />
          </div>
        }
      </div>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps ({posts}) {
  const {
    activeQuery,
    error,
    isFetching,
    postsByType
  } = posts || {
    isFetching: true,
    postsByType: {}
  }

  return {
    activeQuery,
    error,
    isFetching,
    postsByType
  }
}

export default connect(mapStateToProps)(Posts)
