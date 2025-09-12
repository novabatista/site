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
  let church: ChurchResponse = {} as ChurchResponse
  let visual: ChurchVisualResponse = {} as ChurchVisualResponse
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
    <main className="w-full sm:max-w-1/2 md:max-w-4/6 m-auto">
      <header>
        <Image src={visual.logomarcaMenu._optimized[0].url} width={200} height={65} alt="Nova Batista" />
      </header>

      {/* <section id="live"></section> */}

      <section id="events" className="grid grid-cols-3 gap-4">
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

      <section id="prayers" className="grid grid-cols-3 gap-4">
        {prayers.map((pray) => (
          <div key={pray.id} className="p-4 border rounded flex flex-col justify-between">
            {(pray.motivo || pray.oracaoMotivo) && <span className="text-md text-left">{pray.oracaoMotivo ?? pray.motivo}</span>}
            <p>
              {pray.mensagem.substring(0, 100)}
              {pray.mensagem.length > 100 && "..."}
            </p>
            <span className="block text-sm text-right">{pray.nome}</span>
          </div>
        ))}
      </section>

      <section id="colaborate"></section>

      <footer></footer>
    </main>
  );
}
