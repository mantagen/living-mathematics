import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'

import * as actions from './../../src/actions/posts'
import { fetchUrlify } from './../../src/api/endpoints.js'
import {
  generateFetchParams,
  generateWPPostObject,
  generateState
} from './../helpers/posts-data.js'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates RECEIVE_POSTS when fetching pasts has been done', () => {
    const id = 1
    const fetchParams = generateFetchParams({ id })
    const postResponse = generateWPPostObject()
    nock(fetchUrlify(fetchParams))
      .get('')
      .reply(200, [postResponse])

    const transformedPost = actions.postMap(postResponse)
    const expectedActions = [
      { type: actions.REQUEST_POSTS,
        fetchParams },
      { type: actions.RECEIVE_POSTS,
        fetchParams,
        posts: { [id]: transformedPost } }
    ]
    const store = mockStore({ todos: [] })

    return store.dispatch(actions.fetchPosts(fetchParams))
      .then(() => { // return of async actions
        expectedActions[1].receivedAt = store.getActions()[1].receivedAt
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})

describe('select a post', () => {
  it('should create an action to select a post', () => {
    const id = 1
    const expectedAction = {
      type: actions.SELECT_POST,
      id
    }
    expect(actions.selectPost(id)).toEqual(expectedAction)
  })
})

describe('select a category', () => {
  it('should create an action to select a category', () => {
    const category = 'blog'
    const expectedAction = {
      type: actions.SELECT_CATEGORY,
      category
    }
    expect(actions.selectCategory(category)).toEqual(expectedAction)
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
    const fetchParams = {}
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
  it('should return true with initialState -> no items', () => {
    const initialState = generateState()
    expect(actions.shouldFetchPosts(initialState)).toEqual(true)
  })
  it('should return false if already fetching', () => {
    const item = generateWPPostObject()
    const state = generateState({ items: { [item.id]: item }, isFetching: true })
    expect(actions.shouldFetchPosts(state)).toEqual(false)
  })
  it('should return true if query as been invalidated', () => {
    const item = generateWPPostObject()
    const state = generateState({ items: { [item.id]: item }, didInvalidate: true })
    expect(actions.shouldFetchPosts(state)).toEqual(true)
  })
})
