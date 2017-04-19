// @flow

import type {
  FetchParams,
  PostState
} from './../types/types.js'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { fetchPostsIfNeeded, selectPost } from '../actions/posts.js'

class Post extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    const { dispatch, identifier, route: { slug } } = this.props
    const params = { query: { slug }}
    dispatch(fetchPostsIfNeeded(params))
  }

  componentDidUpdate (prevProps) {
    const { route: { slug: prevSlug } } = prevProps
    const { dispatch, route: { slug: newSlug } } = this.props
    const shouldFetch = newSlug !== prevSlug
    shouldFetch && dispatch(fetchPostsIfNeeded({ query: { slug: newSlug }}))
  }

  render () {
    const { post: { id, title, content }, isFetching, lastUpdated } = this.props
    return (
      <section>
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
        </p>
        {isFetching && !id &&
          <h2>Loading...</h2>
        }
        {!isFetching && !id &&
          <h2>Could not find post.</h2>
        }
        {title &&
          <article style={{ opacity: isFetching ? 0.5 : 1 }}>
            <h1 className='article__title'>{ title }</h1>
            <div
              className='article__content'
              dangerouslySetInnerHTML={{__html: content}}
            />
          </article>
        }
      </section>
    )
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps ({posts}) {
  const { selectedPost, items, isFetching, lastUpdated } = posts
  const post = items[selectedPost] || { }

  return {
    post,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(Post)
