import React, { PropTypes } from 'react'

import PostListItem from './post-list-item.js'

const PostList = ({ posts }) => {
  const postListItems = posts.map((post, i) => <PostListItem {...post} key={`article-postListItem-${i}`} />)

  return (
    <ul className='article-list'>
      { posts[0] && postListItems }
    </ul>
  )
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired
}

export default PostList
