// @flow

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPostsIfNeeded } from '../actions/posts.js'
import PostList from '../components/post-list.js'

class App extends Component {
  constructor (props) {
    super(props)
    // $FlowFixMe
    this.handleChange = this.handleChange.bind(this)
    // $FlowFixMe
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount () {
    const { dispatch, selectedCategory, route: { postType } } = this.props
    dispatch(fetchPostsIfNeeded({
      postType: postType,
      query: {
        category: selectedCategory
      }
    }))
  }

  componentDidUpdate (prevProps) {
    const { dispatch, route: { postType }, selectedCategory } = this.props
    if (postType !== prevProps.route.postType
      || selectedCategory !== prevProps.selectedCategory
    ) {
      dispatch(fetchPostsIfNeeded({
        postType: postType,
        query: {
          category: selectedCategory
        }
      }))
    }
  }

  handleChange (nextCategory) {
    const { dispatch, route: { postType } } = this.props
    dispatch(fetchPostsIfNeeded({
      postType: postType,
      query: {
        category: nextCategory
      }
    }))
  }

  handleRefreshClick (e) {
    e.preventDefault()

    const { dispatch, route: { postType }, selectedCategory } = this.props
    dispatch(fetchPostsIfNeeded({
      postType: postType,
      query: {
        category: selectedCategory
      }
    }))
  }

  selectCategory (category) {
    // selectCategory(category)
  }

  render () {
    const { selectedCategory, posts, isFetching, lastUpdated } = this.props
    return (
      <div>
        { selectedCategory }
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href='#'
              onClick={this.handleRefreshClick}>
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

App.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps ({posts}) {
  const {
    isFetching,
    lastUpdated,
    items,
    selectedCategory,
    postsByCategory
  } = posts || {
    isFetching: true,
    items: []
  }
  const blogIds = postsByCategory[selectedCategory]

  return {
    selectedCategory,
    posts: blogIds.map(blogId => items[blogId]).filter(item => !!item),
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)
