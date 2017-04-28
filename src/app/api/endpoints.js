// @flow

import type { FetchParams, LocalQuery, WPQuery } from './../types/types'

import qs from 'querystring-browser'

export const SITE_DOMAIN = 'http://livingmathematics.techniqueandquo.uk/wp'
export const BASE_URL = 'http://livingmathematics.techniqueandquo.uk/wp/wp-json/wp/v2'
const queryMapping = {
  category: 'filter[cat_name]',
  slug: 'filter[name]',
  searchTerm: 'search'
}

export const trimDomainIfExists = (url: string) => url.split(SITE_DOMAIN)[1] || url

export const WPQueryify = (query: LocalQuery): WPQuery => keysMap(queryMapping)(query)

const keysMap = (mapping: Object) => (query: LocalQuery): WPQuery => {
  return Object.keys(query).reduce((prev, curr) => {
    if (query[curr]) {
      prev[mapping[curr]] = query[curr]
    }
    return prev
  }, {})
}

// for now menu id to be input manually to save second request being made
const menuId = 5
export const menuUrl = `http://livingmathematics.techniqueandquo.uk/wp/wp-json/wp-api-menus/v2/menus/${menuId}`

export const fetchUrlify = (params: FetchParams) => {
  const { id, postType = 'pages', query = {} } = params
  if (id) {
    return `${BASE_URL}/${postType}/${id}`
  }
  if (!Object.keys(query)[0]) {
    return `${BASE_URL}/${postType}`
  }
  const queryObject = WPQueryify(query)
  const queryString = Object.keys(queryObject).reduce((prev, curr, i, arr) => {
    prev = prev + curr + '=' + qs.escape(queryObject[curr]) + (i < arr.length - 1 ? '&' : '')
    return prev
  }, '')
  return `${BASE_URL}/${postType}?${queryString}`
}
