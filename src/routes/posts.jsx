// @flow

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPostsIfNeeded } from '../actions/posts.js'
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
    const { posts, isFetching, lastUpdated } = this.props

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
            <PostList posts={posts} />
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
    items,
    itemOrder
  } = posts || {
    isFetching: true,
    items: {},
    itemOrder: []
  }
  const postIds = itemOrder || []

  return {
    activeQuery,
    posts: postIds.map(id => items[id]).filter(item => !!item),
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(Posts)
