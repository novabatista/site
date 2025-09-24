import {ChurchResponse} from '@/interface/inpeace/church'
import {ChurchVisualResponse} from '@/interface/inpeace/visual'
import {EventResponse} from '@/interface/inpeace/events'
import {WorshipResponse} from '@/interface/inpeace/worship'
import {PrayerResponse} from '@/interface/inpeace/prayer'
import {MinistriesResponse} from '@/interface/inpeace/ministrie'
import {Devotional} from '@/interface/inpeace/devotional'
import {YoutubeItemEntry, YoutubeItensList} from '@/interface/youtube/search'
import {
  inPeaceServiceChurchInfo, inPeaceServiceDevocional,
  inPeaceServiceEvents, inPeaceServiceMinistries, inPeaceServicePrayers,
  inPeaceServiceVisual,
  inPeaceServiceWorshipDates,
} from '@/service/inpeace'
import {youtubeServiceLive, youtubeServiceRecents} from '@/service/youtube'

interface AssetsResult {
  church: ChurchResponse
  visual: ChurchVisualResponse
  events: EventResponse[]
  worships: WorshipResponse[]
  prayers: PrayerResponse[]
  ministries: MinistriesResponse
  devotionals: Devotional[]

  latestVideos: YoutubeItensList
  liveVideo: YoutubeItemEntry | undefined
}

type AssetsLoaders = Record<keyof AssetsResult, ()=>void>
type AssetLoadItens = Partial<Record<keyof AssetsResult, boolean>>

async function load(assetsToLoad: AssetLoadItens){
  const assetsResult: AssetsResult = {
    church: {} as ChurchResponse,
    visual: {} as ChurchVisualResponse,
    events: [],
    worships: [],
    prayers: [],
    ministries: [],
    devotionals: [],

    latestVideos: [],
    liveVideo: undefined,
  }
  const assetsLoaders: AssetsLoaders = {
    church: async () => (assetsResult.church = await inPeaceServiceChurchInfo()),
    visual: async () => (assetsResult.visual = await inPeaceServiceVisual()),
    events: async () => (assetsResult.events = await inPeaceServiceEvents()),
    worships: async () => (assetsResult.worships = await inPeaceServiceWorshipDates()),
    prayers: async () => (assetsResult.prayers = await inPeaceServicePrayers()),
    ministries: async () => (assetsResult.ministries = await inPeaceServiceMinistries()),
    devotionals: async () => (assetsResult.devotionals = await inPeaceServiceDevocional()),

    latestVideos: async () => (assetsResult.latestVideos = await youtubeServiceRecents()),
    liveVideo: async () => (assetsResult.liveVideo = await youtubeServiceLive()),
  }

  const promises = Object.entries(assetsToLoad)
    .filter(([_, value]) => value)
    .map(([key]) => assetsLoaders[key as keyof AssetsLoaders]())

  await Promise.allSettled(promises)
  return assetsResult
}

async function all(){
  return load({
    church: true,
    // visual: true,
    events: true,
    worships: true,
    // prayers: true,
    ministries: true,
    devotionals: true,

    latestVideos: true,
    liveVideo: true,
  })
}

const loader = {
  load,
  all,
}

export default loader
