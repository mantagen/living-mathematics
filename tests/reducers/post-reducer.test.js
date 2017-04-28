import reducer from '../../src/app/reducers/post-reducer'
import * as actions from '../../src/app/actions/post-actions'

import {
  generateFetchParams,
  generateState,
  generateWPPostObject
} from '../helpers/posts-data'

const initialState = generateState()

describe('posts reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState)
  })

  it('should handle SELECT_POST', () => {
    const postType = 'page'
    const slug = 'home'
    expect(
      reducer(initialState, {
        type: actions.SELECT_POST,
        postType,
        slug
      })
    ).toEqual(Object.assign({}, initialState, {
      selectedPost: { postType, slug }
    }))
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
    const postType = 'posts'
    const fetchParams = generateFetchParams({ postType })
    const samplePost = generateWPPostObject()
    const state = Object.assign({}, initialState, { isFetching: true })
    const thisDate = Date.now()
    expect(
      reducer(state, {
        type: actions.RECEIVE_POSTS,
        fetchParams: fetchParams,
        posts: {
          [samplePost.slug]: samplePost
        },
        receivedAt: thisDate
      })
    ).toEqual(Object.assign({}, state, {
      activeQuery: fetchParams,
      isFetching: false,
      postsByType: {
        posts: {[samplePost.slug]: samplePost}
      },
      lastUpdated: thisDate
    }))
  })
})
