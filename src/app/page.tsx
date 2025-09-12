import Image from "next/image";
import {ChurchVisualResponse} from '@/interface/inpeace/visual'
import {EventResponse} from '@/interface/inpeace/events'
import {WorshipResponse} from '@/interface/inpeace/worship'
import {PrayerResponse} from '@/interface/inpeace/prayer'
import {ChurchResponse} from '@/interface/inpeace/church'
import {
  inPeaceServiceChurchInfo,
  inPeaceServiceEvents,
  inPeaceServicePrayers,
  inPeaceServiceVisual,
  inPeaceServiceWorshipDates,
} from '@/service/inpeace'


export default async function Home() {
  let church: ChurchResponse
  let visual: ChurchVisualResponse
  let events: EventResponse[] = []
  let worships: WorshipResponse[] = []
  let prayers: PrayerResponse[] = []

  const fetchVisual = async () => (visual = await inPeaceServiceVisual())
  const fetchEvents = async () => (events = await inPeaceServiceEvents());
  const fetchWorshipDates = async () => (worships = await inPeaceServiceWorshipDates());
  const fetchPrayers = async () => (prayers = await inPeaceServicePrayers());
  const fetchChurchInfo = async () => (church = await inPeaceServiceChurchInfo());


  await Promise.allSettled([
    fetchVisual(),
    fetchEvents(),
    fetchWorshipDates(),
    fetchPrayers(),
    fetchChurchInfo(),
  ])

  return (
    <main>
      <header></header>

      {/* <section id="live"></section> */}
      <section id="events" className="grid grid-cols-4 gap-4">
        {events.map((event) => (
          <div className="relative" key={event.id}>
            <Image src={event.image._optimized[0].url} width={470} height={370} alt={event.nome} />
            <div className="bottom-0 left-0 right-0 bg-black opacity-90 text-white text-center py-2 px-4">
              {event.nome}
            </div>
          </div>
        ))}
      </section>
      <section id="gcs"></section>
      <section id="prayers"></section>
      <section id="colaborate"></section>

      <footer></footer>
    </main>
  );
}
