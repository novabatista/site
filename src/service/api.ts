import fetcher from '@/http/fetcher'

export function eventById(id: number) {
  return fetcher.get(`/api/event/${id}`)
}