export interface YoutubeRawSearchResponse {
  kind: string
  etag: string
  nextPageToken: string
  regionCode: string
  pageInfo: PageInfo
  items: YoutubeItensList
}


export interface PageInfo {
  totalResults: number
  resultsPerPage: number
}

export type YoutubeItensList = YoutubeItemEntry[]
export interface YoutubeItemEntry {
  kind: string
  etag: string
  id: Id
  snippet: Snippet
}

export interface Id {
  kind: string
  videoId: string
}

export interface Snippet {
  publishedAt: string
  channelId: string
  title: string
  description: string
  thumbnails: Thumbnails
  channelTitle: string
  liveBroadcastContent: string
  publishTime: string
}

export interface Thumbnails {
  default: ThumbnailEntry
  medium: ThumbnailEntry
  high: ThumbnailEntry
}

export interface ThumbnailEntry {
  url: string
  width: number
  height: number
}