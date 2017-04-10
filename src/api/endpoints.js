// @flow

import type { FetchParams, LocalQuery, WPQuery } from './../types/types.js'

import qs from 'querystring'

const BASE_URL = 'http://livingmathematics.techniqueandquo.uk/wp/wp-json/wp/v2'
const queryMapping = {
  category: 'filter[cat_name]',
  slug: 'filter[name]',
  searchTerm: 'search'
}

const WPQueryify = (query: LocalQuery): WPQuery => keysMap(queryMapping)

const keysMap = (mapping: Object) => (query: LocalQuery): WPQuery => {
  return Object.keys(query).reduce((prev, curr) => {
    if (query[curr]) {
      prev[mapping[curr]] = query[curr]
    }
    return prev
  }, {})
}

export const fetchUrlify = (params: FetchParams) => {
  const { id, postType = 'posts', query = {} } = params
  if (id) {
    return `${BASE_URL}/${id}`
  }
  const queryString = qs.stringify(WPQueryify(query))
  return `${BASE_URL}/${postType}?${queryString}`
}
