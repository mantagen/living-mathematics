import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'

import * as actions from './../../src/actions/post-actions.js'
import { BASE_URL } from './../../src/api/endpoints.js'
import {
  generateFetchParams,
  generateWPPostObject,
  generateWPResponse,
  generateState
} from './../helpers/posts-data.js'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

    it('creates RECEIVE_POSTS when fetching posts has been done\n.'
      + 'if many items are returned, it does not create SELECT_POST', () => {
      const postType = 'posts'
      const fetchParams = generateFetchParams({ postType })
      const postResponse = generateWPResponse(5)
      nock(BASE_URL)
        .get(`/${postType}`)
        .reply(200, postResponse)

      const transformedPosts = postResponse.map(actions.postMap)
      const expectedActions = [{
        type: actions.REQUEST_POSTS,
        fetchParams
      }, {
        type: actions.RECEIVE_POSTS,
        fetchParams,
        posts: transformedPosts.reduce((accum, post) => {
          accum[post.slug] = post
          return accum
        }, {})
      }]
      const store = mockStore({})

      return store.dispatch(actions.fetchPosts(fetchParams))
        .then(() => { // return of async actions
          expectedActions[1].receivedAt = store.getActions()[1].receivedAt
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
})

describe('select a post', () => {
  it('should create an action to select a post', () => {
    const postType = 'page'
    const slug = 'home'
    const expectedAction = {
      type: actions.SELECT_POST,
      postType,
      slug
    }
    expect(actions.selectPost({ postType, slug })).toEqual(expectedAction)
  })
})

describe('request posts', () => {
  it('should create an action to request post', () => {
    const fetchParams = {}
    const expectedAction = {
      type: actions.REQUEST_POSTS,
      fetchParams
    }
    expect(actions.requestPosts(fetchParams)).toEqual(expectedAction)
  })
})

describe('receive posts', () => {
  it('should create an action to receive posts', () => {
    const fetchParams = generateFetchParams()
    const json = []
    const expectedAction = {
      type: actions.RECEIVE_POSTS,
      fetchParams,
      posts: {}
    }
    const actualAction = actions.receivePosts(fetchParams, json)
    expect(actualAction.type).toEqual(expectedAction.type)
    expect(actualAction.posts).toEqual(expectedAction.posts)
    expect(actualAction.fetchParams).toEqual(expectedAction.fetchParams)
    expect(actualAction).toHaveProperty('receivedAt')
    expect(Number.isInteger(actualAction.receivedAt)).toEqual(true)
  })
})

describe('shouldFetchPosts', () => {
  const postType = 'posts'
  it('should return true with initialState -> no items', () => {
    const initialState = generateState()
    expect(actions.shouldFetchPosts(initialState, generateFetchParams())).toEqual(true)
  })
  it('should return false if already fetching', () => {
    const item = generateWPPostObject()
    const fetchParams = generateFetchParams()
    const state = generateState({
      activeQuery: fetchParams,
      postsByType: { [postType]: actions.postMap(generateWPPostObject({ postType })) },
      isFetching: true
    })
    expect(actions.shouldFetchPosts(state, fetchParams)).toEqual(false)
  })
  it('should return true if query as been invalidated', () => {
    const item = generateWPPostObject()
    const state = generateState({
      postsByType: { [postType]: actions.postMap(generateWPPostObject()) },
      didInvalidate: true
    })
    expect(actions.shouldFetchPosts(state, generateFetchParams())).toEqual(true)
  })
})
