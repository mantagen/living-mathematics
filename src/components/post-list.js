import React, { PropTypes } from 'react'

import PostListItem from './post-list-item.js'

const PostList = ({ posts, type }) => {
  const postListItems = posts.map((post, i) => <PostListItem {...post} type={type} key={`article-postListItem-${i}`} />)

  return (
    <ul className='article-list'>
      { posts[0] && postListItems }
    </ul>
  )
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  type: PropTypes.string
}

export default PostList
