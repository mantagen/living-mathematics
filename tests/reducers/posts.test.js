import reducer from './../../src/reducers/posts.js'
import * as actions from './../../src/actions/posts.js'

import {
  generateFetchParams,
  generateState,
  generateWPPostObject
} from './../helpers/posts-data.js'

const initialState = generateState()

describe('posts reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState)
  })

  it('should handle SELECT_POST', () => {
    const id = 1
    expect(
      reducer(initialState, {
        type: actions.SELECT_POST,
        id: id
      })
    ).toEqual(Object.assign({}, initialState, { selectedPost: id }))
  })

  it('should handle SELECT_CATEGORY', () => {
    const category = 'archive'
    expect(
      reducer(initialState, {
        type: actions.SELECT_CATEGORY,
        category: category
      })
    ).toEqual(Object.assign({}, initialState, { selectedCategory: category }))
  })

  it('should handle REQUEST_POSTS', () => {
    const fetchParams = generateFetchParams()
    expect(
      reducer(initialState, {
        type: actions.REQUEST_POSTS,
        fetchParams: fetchParams
      })
    ).toEqual(Object.assign({}, initialState, { isFetching: true }))
  })

  it('should handle RECEIVE_POSTS', () => {
    const fetchParams = generateFetchParams({ query: { category: 'blog' }})
    const samplePost = generateWPPostObject()
    const state = Object.assign({}, initialState, { isFetching: true })
    const thisDate = Date.now()
    expect(
      reducer(state, {
        type: actions.RECEIVE_POSTS,
        fetchParams: fetchParams,
        posts: {
          [samplePost.id]: samplePost
        },
        receivedAt: thisDate
      })
    ).toEqual(Object.assign({}, state, {
      isFetching: false,
      items: {
        [samplePost.id]: samplePost
      },
      activeQuery: fetchParams,
      lastUpdated: thisDate,
      postsByCategory: {
        'blog': [samplePost.id.toString()]
      }
    }))
  })
})
