// @flow

import type {
  FetchParams,
  WPPost,
  LocalPost,
  LocalPostId,
  PostState
} from './../types/types.js'

import fetch from 'isomorphic-fetch'

import { fetchUrlify } from './../api/endpoints.js'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_POST = 'SELECT_POST'

export function selectPost (id: LocalPostId) {
  return {
    type: SELECT_POST,
    id
  }
}

export function requestPosts (fetchParams: FetchParams) {
  return {
    type: REQUEST_POSTS,
    fetchParams
  }
}

export const fileMap = (acf: any): any => {
  if (!acf) {
    return undefined
  } else if (!acf.file) {
    return undefined
  } else {
    const fnArr = acf.file.filename.split('.')
    return {
      id: acf.file.id,
      url: acf.file.url,
      ext: fnArr[fnArr.length - 1],
      description: acf.description
    }
  }
}

export const postMap = (post: WPPost): LocalPost => ({
  content: post.content ? post.content.rendered : '',
  id: post.id,
  date: post.date,
  file: fileMap(post.acf),
  link: post.link,
  slug: post.slug,
  title: post.title.rendered,
  snippet: post.excerpt ? post.excerpt.rendered : ''
})

export function receivePosts (fetchParams: FetchParams, json: Array<Object>) {
  return {
    type: RECEIVE_POSTS,
    fetchParams,
    posts: json
      .filter(post => post.status === 'publish')
      .reduce((accum, post) => {
        accum[post.id.toString()] = postMap(post)
        return accum
      }, {}),
    order: json.map(post => post.id.toString()),
    receivedAt: Date.now()
  }
}

export function fetchPosts (fetchParams: FetchParams) {
  return (dispatch: Function) => {
    dispatch(requestPosts(fetchParams))
    return fetch(fetchUrlify(fetchParams))
      .then(response => response.json())
      .then(json => dispatch(receivePosts(fetchParams, json)))
      .then(state => {
        if (Object.keys(state.posts).length === 1) {
          dispatch(selectPost(Object.keys(state.posts)[0]))
        }
      })
  }
}

export function shouldFetchPosts (state: PostState, fetchParams: FetchParams) {
  const { items, activeQuery } = state
  if (!Object.keys(items)[0]) {
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
    if (shouldFetchPosts(getState().posts, fetchParams)) {
      return dispatch(fetchPosts(fetchParams))
    }
  }
}
