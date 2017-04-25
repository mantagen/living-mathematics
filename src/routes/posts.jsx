// @flow

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPostsIfNeeded } from '../actions/post-actions.js'
import PostList from '../components/post-list.js'

class Posts extends Component {
  constructor (props) {
    super(props)
    // $FlowFixMe
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

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

  handleRefreshClick (e) {
    e.preventDefault()

    const { activeQuery, dispatch, params: { postType } } = this.props
    dispatch(fetchPostsIfNeeded(Object.assign({}, activeQuery, { postType, query: {} })))
  }

  render () {
    const { postsByType, isFetching, lastUpdated, params: { postType } } = this.props
    const postsObject = postsByType[postType] || {}
    const posts = Object.keys(postsObject).map(slug => postsObject[slug]).filter(post => !!post)

    return (
      <div>
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href='#'
              onClick={this.handleRefreshClick}
            >
              Refresh
            </a>
          }
        </p>
        {isFetching && posts.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && posts.length === 0 &&
          <h2>Empty.</h2>
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
    isFetching,
    lastUpdated,
    postsByType
  } = posts || {
    isFetching: true,
    postsByType: {}
  }

  return {
    activeQuery,
    isFetching,
    lastUpdated,
    postsByType
  }
}

export default connect(mapStateToProps)(Posts)
