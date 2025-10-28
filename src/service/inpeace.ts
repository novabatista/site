import {ChurchVisualResponse} from '@/interface/inpeace/visual'
import {EventResponse} from '@/interface/inpeace/events'
import {WorshipResponse} from '@/interface/inpeace/worship'
import {PrayerResponse} from '@/interface/inpeace/prayer'
import {ChurchResponse} from '@/interface/inpeace/church'

import church from '@/mock/church.json'
import event from '@/mock/event.json'
import prayer from '@/mock/prayer.json'
import visual from '@/mock/visual.json'
import worship from '@/mock/worship.json'
import ministrie from '@/mock/ministrie.json'
import devotional from '@/mock/devotional.json'
import fetcher from '@/http/fetcher'
import {MinistriesResponse} from '@/interface/inpeace/ministrie'
import {Devotional} from '@/interface/inpeace/devotional'

const {
  INPEACE_CHURCH_ID,
  INPEACE_API_URL,
  INPEACE_CHURCH_SLUG,
  INPEACE_CHURCH_ALIAS,
} = process.env;

const useMock = false;
async function simpleFetch<Response>(url: string, rootProp?:string): Promise<Response> {
  const response = await fetcher.get(url)

  if(rootProp){
    if(rootProp === 'devocionais'){
      console.log('devocionais', response, url)
    }
    return response[rootProp];
  }
  return response;
}

export function inPeaceServiceVisual(): Promise<ChurchVisualResponse> {
  if(useMock){
    return Promise.resolve(visual.igrejaVisual)
  }
  return simpleFetch<ChurchVisualResponse>(`${INPEACE_API_URL}/igreja/${INPEACE_CHURCH_SLUG}/visual`, 'igrejaVisual')
}

export function inPeaceServiceEvents(): Promise<EventResponse[]> {
  if(useMock){
    return Promise.resolve(event.eventos)
  }
  return simpleFetch<EventResponse[]>(`${INPEACE_API_URL}/igreja/${INPEACE_CHURCH_SLUG}/evento`, 'eventos')
}

export function inPeaceServiceEventById(id:number): Promise<EventResponse> {
  return simpleFetch<EventResponse>(`${INPEACE_API_URL}/igreja/${INPEACE_CHURCH_SLUG}/evento/${id}`)
}

export function inPeaceServiceWorshipDates(): Promise<WorshipResponse[]> {
  if(useMock){
    return Promise.resolve(worship.cultos)
  }
  return simpleFetch<WorshipResponse[]>(`${INPEACE_API_URL}/culto/${INPEACE_CHURCH_ALIAS}?igreja=${INPEACE_CHURCH_ID}`, 'cultos')
}

export function inPeaceServicePrayers(): Promise<PrayerResponse[]> {
  if(useMock){
    return Promise.resolve(prayer as PrayerResponse[])
  }
  return simpleFetch<PrayerResponse[]>(`${INPEACE_API_URL}/oracao/${INPEACE_CHURCH_SLUG}`)
}

export function inPeaceServiceChurchInfo(): Promise<ChurchResponse> {
  if(useMock){
    return Promise.resolve(church)
  }
  return simpleFetch<ChurchResponse>(`${INPEACE_API_URL}/igreja/${INPEACE_CHURCH_ID}`)
}
export function inPeaceServiceMinistries(): Promise<MinistriesResponse> {
  if(useMock){
    return Promise.resolve(ministrie as MinistriesResponse)
  }
  return simpleFetch<MinistriesResponse>(`${INPEACE_API_URL}/ministerio/${INPEACE_CHURCH_SLUG}`)
}
export function inPeaceServiceDevocional(): Promise<Devotional[]> {
  if(useMock){
    return Promise.resolve(devotional.devocionais as Devotional[])
  }
  return simpleFetch<Devotional[]>(`${INPEACE_API_URL}/igreja/${INPEACE_CHURCH_SLUG}/devocional`, 'devocionais')
}