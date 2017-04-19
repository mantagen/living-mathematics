import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const PostListItem = ({ link, title, file, id, slug, snippet }) => {
  snippet = snippet || (file && file.description)

  return (
    <li className='article-listItem'>
      <Link to={file ? file.url : `/post/${id}`} target={file && '_blank'}>
        <h2 className='article-listItem__title'>{title}
          { file && <span className='article-listItem__filetype'>{ file.ext }</span> }
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
  file: PropTypes.object
}

export default PostListItem
