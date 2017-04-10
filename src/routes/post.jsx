// @flow

import type {
  State
} from './../types/types.js'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { selectPost } from '../actions/posts.js'

class App extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    const { dispatch, identifier, params: { id } } = this.props
    dispatch(selectPost(id))
  }

  componentDidUpdate (prevProps) {
    const { params: { id: prevID } } = prevProps
    const { dispatch, params: { id: newID } } = this.props
    const shouldFetch = newID !== prevID
    shouldFetch && dispatch(selectPost(newID))
  }

  render () {
    const { post: { id, title, snippet }, isFetching, lastUpdated } = this.props
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
              dangerouslySetInnerHTML={{__html: snippet}}
            />
          </article>
        }
      </section>
    )
  }
}

App.propTypes = {
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

export default connect(mapStateToProps)(App)
