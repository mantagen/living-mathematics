// @flow

export type LocalPostId = string

export type LocalQuery = {
  category?: string,
  searchTerm?: string,
  slug?: string,
}

export type FetchParams = {
  id?: number,
  postType: string,
  query: LocalQuery
}

export type File = {
  id: string,
  url: string,
}

export type Slug = string

export type Acf = {
  file?: File
}

export type LocalPost = {
  content: string,
  date: string,
  id: LocalPostId,
  file?: File,
  link: string,
  type: string,
  slug: string,
  title: string,
  snippet: string
}

type Rendered = {
  rendered: string
}

export type WPPost = {
  acf?: Object,
  content: Rendered,
  date: string,
  id: LocalPostId,
  link: string,
  slug: string,
  title: Rendered,
  type: string,
  excerpt?: Rendered
}

export type PostsByType = { [slug: Slug]: LocalPost }

type SelectedPost = {
  postType: string,
  slug: string
}

export type PostState = {
  activeQuery?: FetchParams,
  didInvalidate: boolean,
  isFetching: boolean,
  postsByType: { [string]: PostsByType },
  lastUpdated?: Date,
  selectedPost?: SelectedPost
}

export type NavState = {
  items: Array<Object>,
  isFetching: boolean,
}

export type WPQuery = {
  'filter[name]'?: string,
  'filter[cat_name]'?: string,
  'search'?: string,
}
