// @flow

export type LocalQuery = {
  category?: string,
  searchTerm?: string,
  slug?: string,
}

export type FetchParams = {
  id?: number,
  postType?: string,
  query: LocalQuery
}

export type LocalPost = {
  content: string,
  date: string,
  id: number,
  link: string,
  slug: string,
  title: string,
  snippet: string
}

type Rendered = {
  rendered: string
}

export type WPPost = {
  content: Rendered,
  date: string,
  id: number,
  link: string,
  slug: string,
  title: Rendered,
  excerpt?: Rendered
}

export type PostsByCategory = {
  [category: string]: Array<number>
}

export type State = {
  activeQuery?: FetchParams,
  didInvalidate: boolean,
  isFetching: boolean,
  items: { [id: number]: LocalPost },
  lastUpdated?: Date,
  postIdsBySlug: { [slug: string]: number },
  postsByCategory: PostsByCategory,
  selectedCategory: string,
  selectedPost?: number,
}

export type Category = string

export type PostId = Number

export type WPQuery = {
  'filter[name]'?: string,
  'filter[cat_name]'?: string,
  'search'?: string,
}
