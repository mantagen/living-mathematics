import {
  BASE_URL,
  WPQueryify,
  fetchUrlify,
} from './../../src/api/endpoints.js'

describe('WPQuerify', () => {
  const localQuery = {
    category: 'cats',
    searchTerm: 'grey and wild'
  }
  const expectedWPQuery = {
    'filter[cat_name]': 'cats',
    'search': 'grey and wild'
  }
  it('should correctly map from a local query format to WP\'s query format', () => {
    expect(WPQueryify(localQuery)).toEqual(expectedWPQuery)
  })
})

describe('fetchUrlify', () => {
  const fetchParams = {
    postType: 'archive',
    query: {
      category: 'cats',
      searchTerm: 'grey and wild'
    }
  }
  const expectedUrl = `${BASE_URL}/archive?filter[cat_name]=cats&search=grey%20and%20wild`
  it('should convert fetchParams to the correct WP\'s query string', () => {
    expect(fetchUrlify(fetchParams)).toEqual(expectedUrl)
  })
})
