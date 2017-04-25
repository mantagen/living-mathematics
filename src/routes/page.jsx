// @flow

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { fetchPostsIfNeeded, selectPost } from '../actions/post-actions.js'

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

Page.propTypes = {
  post: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps ({posts}) {
  const { selectedPost: { postType, slug }, postsByType, isFetching, lastUpdated } = posts
  const post = postsByType[postType][slug] || { }

  return {
    post,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(Page)
