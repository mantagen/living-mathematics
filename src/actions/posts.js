import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'

function requestPosts (category) {
  return {
    type: REQUEST_POSTS,
    category
  }
}

function receivePosts (category, json) {
  return {
    type: RECEIVE_POSTS,
    category,
    posts: json
      .filter(post => post.status === 'publish')
      .map(post => (({ link, title, excerpt }) => ({ link, title: title.rendered, snippet: excerpt.rendered }))(post)),
    receivedAt: Date.now()
  }
}

function fetchPosts (category) {
  return dispatch => {
    dispatch(requestPosts(category))
    return fetch(`http://livingmathematics.techniqueandquo.uk/wp/wp-json/wp/v2/posts`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(category, json)))
  }
}

function shouldFetchPosts (state, category) {
  const posts = state.postsByCategory[category]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded (category) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), category)) {
      return dispatch(fetchPosts(category))
    }
  }
}
