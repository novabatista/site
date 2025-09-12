import {ChurchVisualResponse} from '@/interface/inpeace/visual'
import {EventResponse} from '@/interface/inpeace/events'
import {WorshipResponse} from '@/interface/inpeace/worship'
import {PrayerResponse} from '@/interface/inpeace/prayer'
import {ChurchResponse} from '@/interface/inpeace/church'

import church from '../../mocks/church.json'
import event from '../../mocks/event.json'
import prayer from '../../mocks/prayer.json'
import visual from '../../mocks/visual.json'
import worship from '../../mocks/worship.json'

const {
  INPEACE_CHURCH_ID,
  INPEACE_API_URL,
  INPEACE_CHURCH_ALIAS,
  INPEACE_CHURCH_ALIAS_SHORT,
} = process.env;

async function simpleFetch<Response>(url: string, rootProp?:string): Promise<Response> {
  const request = await fetch(url)
  const response = await request.json()
  /* console.log(url)
  // console.log(response)
  console.log(JSON.stringify(response))
  console.log('---------------------------------------') */

  if(rootProp){
    return response[rootProp];
  }
  return response;
}

export function inPeaceServiceVisual(): Promise<ChurchVisualResponse> {
  return Promise.resolve(visual.igrejaVisual)
  return simpleFetch<ChurchVisualResponse>(`${INPEACE_API_URL}/igreja/${INPEACE_CHURCH_ALIAS}/visual`, 'igrejaVisual')
}

export function inPeaceServiceEvents(): Promise<EventResponse[]> {
  return Promise.resolve(event.eventos)
  return simpleFetch<EventResponse[]>(`${INPEACE_API_URL}/igreja/${INPEACE_CHURCH_ALIAS}/evento`, 'eventos')
}

export function inPeaceServiceWorshipDates(): Promise<WorshipResponse[]> {
  return Promise.resolve(worship.cultos)
  return simpleFetch<WorshipResponse[]>(`${INPEACE_API_URL}/culto/${INPEACE_CHURCH_ALIAS_SHORT}?igreja=${INPEACE_CHURCH_ID}`, 'cultos')
}

export function inPeaceServicePrayers(): Promise<PrayerResponse[]> {
  return Promise.resolve(prayer as PrayerResponse[])
  return simpleFetch<PrayerResponse[]>(`${INPEACE_API_URL}/oracao/${INPEACE_CHURCH_ALIAS}`)
}

export function inPeaceServiceChurchInfo(): Promise<ChurchResponse> {
  return Promise.resolve(church)
  return simpleFetch<ChurchResponse>(`${INPEACE_API_URL}/igreja/${INPEACE_CHURCH_ID}`)
}