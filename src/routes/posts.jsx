import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectCategory, fetchPostsIfNeeded } from '../actions/posts.js'
import PostList from '../components/post-list.js'

class App extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount () {
    const { dispatch, selectedCategory } = this.props
    dispatch(fetchPostsIfNeeded(selectedCategory))
  }

  componentDidUpdate (prevProps) {
    if (this.props.selectedCategory !== prevProps.selectedCategory) {
      const { dispatch, selectedCategory } = this.props
      dispatch(fetchPostsIfNeeded(selectedCategory))
    }
  }

  handleChange (nextCategory) {
    this.props.dispatch(fetchPostsIfNeeded(nextCategory))
  }

  handleRefreshClick (e) {
    e.preventDefault()

    const { dispatch, selectedCategory } = this.props
    dispatch(fetchPostsIfNeeded(selectedCategory))
  }

  selectCategory (category) {
    selectCategory(category)
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

function mapStateToProps (state) {
  const { selectedCategory, postsByCategory } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByCategory[selectedCategory] || {
    isFetching: true,
    items: []
  }

  return {
    selectedCategory,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)
