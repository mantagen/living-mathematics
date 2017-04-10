// @flow

import type {
  FetchParams,
  PostId,
  State
} from './../types/types.js'

import fetch from 'isomorphic-fetch'

import { fetchUrlify } from './../api/endpoints.js'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_POST = 'SELECT_POST'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'

export function selectPost (id: PostId) {
  return {
    type: SELECT_POST,
    id
  }
}

function requestPosts (fetchParams: FetchParams) {
  return {
    type: REQUEST_POSTS,
    fetchParams
  }
}

const postMap = (post) => ({
  id: post.id,
  link: post.link,
  slug: post.slug,
  title: post.title.rendered,
  snippet: post.excerpt ? post.excerpt.rendered : ''
})

function receivePosts (fetchParams: FetchParams, json) {
  return {
    type: RECEIVE_POSTS,
    fetchParams,
    posts: json
      .filter(post => post.status === 'publish')
      .reduce((accum, post) => {
        accum[post.id] = postMap(post)
        return accum
      }, {}),
    receivedAt: Date.now()
  }
}

function fetchPosts (fetchParams: FetchParams) {
  return dispatch => {
    dispatch(requestPosts(fetchParams))
    return fetch(fetchUrlify(fetchParams))
      .then(response => response.json())
      .then(json => dispatch(receivePosts(fetchParams, json)))
  }
}

function shouldFetchPosts (state: State, fetchParams: FetchParams) {
  const { items, activeQuery } = state
  if (!items) {
    return true
    // note: order of fetchParams matters for below condition to have any use
  } else if (JSON.stringify(activeQuery) !== JSON.stringify(fetchParams)) {
    return true
  } else if (state.isFetching) {
    return false
  } else {
    return state.didInvalidate
  }
}

export function fetchPostsIfNeeded (fetchParams: FetchParams) {
  return (dispatch: Function, getState: Function) => {
    if (shouldFetchPosts(getState(), fetchParams)) {
      return dispatch(fetchPosts(fetchParams))
    }
  }
}
