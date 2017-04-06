import React, { PropTypes } from 'react'

const PostListItem = ({ link, title, snippet, newTab }) => {
  return (
    <li className='article-listItem'>
      <a href={link} target={newTab && '_blank'}>
        <h2 className='article-listItem__title'>{title}
          <span className='article-listItem__filetype'>pdf oe</span>
        </h2>
        <div
          className='article-listItem__snippet'
          dangerouslySetInnerHTML={{__html: snippet}}
        />
      </a>
    </li>
  )
}

PostListItem.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  snippet: PropTypes.string.isRequired,
  newTab: PropTypes.bool
}

export default PostListItem
