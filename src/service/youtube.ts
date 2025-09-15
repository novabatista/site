import fetcher from '@/http/fetcher';
import {objectToQueryString, QueryStringObject} from '@/http/query-string'
import {YoutubeItemEntry, YoutubeItensList, YoutubeRawSearchResponse} from '@/interface/youtube/search'

/** @see https://developers.google.com/youtube/v3/docs */

const {
  YOUTUBE_API_KEY,
  YOUTUBE_CHANNEL_ID,
} = process.env;
export async function youtubeServiceSearch(params: QueryStringObject = {}): Promise<YoutubeItensList>{
  const queryString = objectToQueryString({
    ...params,
    key: YOUTUBE_API_KEY,
  })
  const url = 'https://www.googleapis.com/youtube/v3/search?'+queryString
  const response = await fetcher.get<YoutubeRawSearchResponse>(url)

  return response?.items ?? []
}

export async function youtubeServiceLive(): Promise<YoutubeItemEntry|undefined>{
  const today = new Date()
  const weekday = today.getDay()
  const notWorshipDay = [0, 3].includes(weekday)
  if(notWorshipDay){
    return
  }

  const lives = await youtubeServiceSearch({
    part: 'snippet,id',
    eventType: 'live',
    type: 'video',
    maxResults: '1',
    channelId: YOUTUBE_CHANNEL_ID,
  })

  return lives?.[0]
}

export async function youtubeServiceRecents(): Promise<YoutubeItensList>{
  const latests = await youtubeServiceSearch({
    part: 'snippet,id',
    order: 'date',
    maxResults: '6',
    channelId: YOUTUBE_CHANNEL_ID,
  })

  return latests.filter(({snippet}) => !snippet.title.includes('Manhã'))
}