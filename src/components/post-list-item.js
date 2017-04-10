import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const PostListItem = ({ link, title, id, slug, snippet, newTab }) => {
  return (
    <li className='article-listItem'>
      <Link to={`/post/${id}`} target={newTab && '_blank'}>
        <h2 className='article-listItem__title'>{title}
          <span className='article-listItem__filetype'>pdf oe</span>
        </h2>
        <div
          className='article-listItem__snippet'
          dangerouslySetInnerHTML={{__html: snippet}}
        />
      </Link>
    </li>
  )
}

PostListItem.propTypes = {
  link: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  snippet: PropTypes.string.isRequired,
  newTab: PropTypes.bool
}

export default PostListItem
