// @flow
import * as types from './../../src/types/types.js'

const initialState = {
  activeQuery: undefined,
  didInvalidate: false,
  isFetching: false,
  items: { },
  itemOrder: [],
  lastUpdated: undefined,
  selectedPost: undefined
}
export const generateState = (data: Object): types.PostState =>
  Object.assign({}, initialState, data)
export const generateFetchParams = (data: Object): types.FetchParams =>
  Object.assign({}, data)
export const generateWPResponse = (num: number): Array<types.WPPost> =>
  Array.apply(null, Array(5)).map((elem, i) => generateWPPostObject({ id: i }))
export const generateWPPostObject = (data: Object): types.WPPost =>
  Object.assign({
    id: 1,
    date: "2017-04-05T14:45:43",
    date_gmt: "2017-04-05T14:45:43",
    guid: {
      rendered: "http://livingmathematics.techniqueandquo.uk/wp/?p=1"
    },
    modified: "2017-04-06T18:13:51",
    modified_gmt: "2017-04-06T18:13:51",
    slug: "hello-world",
    status: "publish",
    type: "post",
    link: "http://livingmathematics.techniqueandquo.uk/wp/2017/04/05/hello-world/",
    title: {
      rendered: "Extravaganza meetup"
    },
    content: {
      rendered: "<p>Welcome to WordPress. This is your first post. Edit or delete it, then start writing!</p> ",
      protected: false
    },
    excerpt: {
      rendered: "<p>Welcome to WordPress. This is your first post. Edit or delete it, then start writing!</p> ",
      protected: false
    },
    author: 1,
    featured_media: 0,
    comment_status: "open",
    ping_status: "open",
    sticky: false,
    template: "",
    format: "standard",
    meta: [ ],
    categories: [
      3
    ],
    tags: [ ],
    _links: {
      self: [
        {
          href: "http://livingmathematics.techniqueandquo.uk/wp/wp-json/wp/v2/posts/1"
        }
      ],
      collection: [
        {
          href: "http://livingmathematics.techniqueandquo.uk/wp/wp-json/wp/v2/posts"
        }
      ],
      about: [
        {
          href: "http://livingmathematics.techniqueandquo.uk/wp/wp-json/wp/v2/types/post"
        }
      ],
      author: [
        {
          embeddable: true,
          href: "http://livingmathematics.techniqueandquo.uk/wp/wp-json/wp/v2/users/1"
        }
      ],
      replies: [
        {
          embeddable: true,
          href: "http://livingmathematics.techniqueandquo.uk/wp/wp-json/wp/v2/comments?post=1"
        }
      ],
      "version-history": [{
        href: "http://livingmathematics.techniqueandquo.uk/wp/wp-json/wp/v2/posts/1/revisions"
      }],
      "wp:attachment": [{
        href: "http://livingmathematics.techniqueandquo.uk/wp/wp-json/wp/v2/media?parent=1"
      }],
      "wp:term": [{
      taxonomy: "category",
      embeddable: true,
      href: "http://livingmathematics.techniqueandquo.uk/wp/wp-json/wp/v2/categories?post=1"
      }, {
        taxonomy: "post_tag",
        embeddable: true,
        href: "http://livingmathematics.techniqueandquo.uk/wp/wp-json/wp/v2/tags?post=1"
      }],
      curies: [{
        name: "wp",
        href: "https://api.w.org/{rel}",
        templated: true
      }]
    }
  }, data)
