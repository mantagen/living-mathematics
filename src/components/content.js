import React from 'react'

import LoadingMoon from './loading-moon.js'

const Content = ({ post: { id, title, content }, error, isFetching }) => (
  <section>
    {isFetching && !id &&
      <LoadingMoon />
    }
    {!isFetching && error &&
      <h2>{error}</h2>
    }
    {!isFetching && !error && !id &&
      <h2>Could not find post.</h2>
    }
    {title &&
      <article style={{ opacity: isFetching ? 0.5 : 1 }}>
        <h1 className='article__title'>{ title }</h1>
        <div
          className='article__content'
          dangerouslySetInnerHTML={{__html: content}}
        />
      </article>
    }
  </section>
)

export default Content
