// @flow

import type { NavState } from './../types/types'

import fetch from 'isomorphic-fetch'

import { menuUrl, trimDomainIfExists } from './../api/endpoints'

export const REQUEST_NAV = 'REQUEST_NAV'
export const RECEIVE_NAV = 'RECEIVE_NAV'

export function requestNav () {
  return {
    type: REQUEST_NAV
  }
}

export function receiveNav (json: Object) {
  return {
    type: RECEIVE_NAV,
    items: json.items.map((item) => ({
      link: trimDomainIfExists(item.url),
      title: item.title
    }))
  }
}

export function fetchNav () {
  return (dispatch: Function) => {
    dispatch(requestNav())
    return fetch(menuUrl)
    .then(response => response.json())
    .then(json => dispatch(receiveNav(json)))
  }
}

export function shouldFetchNav (state: NavState) {
  const { items } = state
  return !items[0]
}

export function fetchNavIfNeeded () {
  return (dispatch: Function, getState: Function) => {
    if (shouldFetchNav(getState().nav)) {
      return dispatch(fetchNav())
    }
  }
}
