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
  inPeaceServiceMinistries,
  inPeaceServiceVisual,
  inPeaceServiceWorshipDates,
} from '@/service/inpeace'
import {YoutubeItemEntry, YoutubeItensList} from '@/interface/youtube/search'
import {youtubeServiceLive, youtubeServiceRecents} from '@/service/youtube'
import {formateDateLocale} from '@/date/date'
import {MinistriesResponse} from '@/interface/inpeace/ministrie'
import Button from '@/components/server/Button'
import EventItem from '@/components/client/Event/EventItem'

const gcURL = process.env.GCS_URL;
const transfers = [
  {
    qrcode: '/qr-dizimo-bradesco.png',
    pix: 'igrejanovabatistatatuape@gmail.com',
    pix_key_type: 'email',
    bank: 'Bradesco',
    bank_icon: '/bradesco.png',
    agency: '2423',
    account: '53300-9',
  },
  {
    qrcode: '/qr-dizimo-itau.png',
    pix: '38.008.999/0001-98',
    pix_key_type: 'cnpj',
    bank: 'Itaú',
    bank_icon: '/itau.png',
    agency: '0452',
    account: '35614-0',
  }
]

function KeyValue(props: {label: string, value: string}) {
  return (
    <div className="flex flex-row">
      <span className="text-sm font-semibold">{props.label}:&nbsp;</span>
      <span className="text-sm">{props.value}</span>
    </div>
  )
}
export default async function Home() {
  let church: ChurchResponse = {} as ChurchResponse
  let visual: ChurchVisualResponse = {} as ChurchVisualResponse
  let events: EventResponse[] = []
  let worships: WorshipResponse[] = []
  // let prayers: PrayerResponse[] = []
  let ministries: MinistriesResponse = []

  let latestVideos: YoutubeItensList = []
  let liveVideo: YoutubeItemEntry | undefined = undefined

  const fetchVisual = async () => (visual = await inPeaceServiceVisual())
  const fetchEvents = async () => (events = await inPeaceServiceEvents());
  const fetchWorshipDates = async () => (worships = await inPeaceServiceWorshipDates());
  // const fetchPrayers = async () => (prayers = await inPeaceServicePrayers());
  const fetchChurchInfo = async () => (church = await inPeaceServiceChurchInfo());
  const fetchMinistries = async () => (ministries = await inPeaceServiceMinistries());

  const fetchLatestVideos = async () => (latestVideos = await youtubeServiceRecents());
  const fetchLiveVideo = async () => (liveVideo = await youtubeServiceLive());


  await Promise.allSettled([
    fetchVisual(),
    fetchEvents(),
    fetchWorshipDates(),
    // fetchPrayers(),
    fetchChurchInfo(),
    fetchMinistries(),
    // --
    fetchLatestVideos(),
    fetchLiveVideo(),
  ])

  const churchDirectionUrl = `https://www.google.com/maps/dir//${church.latitude},${church.longitude}`
  const featuredVideo = liveVideo ?? latestVideos.shift()
  latestVideos = latestVideos.slice(0, 3)

  function renameYTVideo(video: YoutubeItemEntry): string {
    const pieces = video.snippet.title.split('-')
    const newName = [
      pieces[0],
      pieces[2],
      // formateDateLocale(new Date(video.snippet.publishedAt)),
    ]

    return newName.join(' - ')
  }

  return (
    <main className="w-11/12 sm:max-w-10/12 md:max-w-8/12 m-auto">
      <header className="flex justify-center items-center">
        <Image src={visual.logomarcaMenu._optimized[0].url} width={200} height={65} alt="Nova Batista" />
      </header>

      {(featuredVideo) && <section id="video-featured" className="">
        <div className="w-full h-[80vh] mb-4">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${featuredVideo.id.videoId}?autoplay=0&mute=1`}
            title="YouTube video player" frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen></iframe>
        </div>
      </section>}

      <section id="videos-latest">
        <h2>Cultos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {latestVideos.map((video) => (
            <a key={video.id.videoId} className="relative" href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noreferrer">
              <Image src={video.snippet.thumbnails.high.url} width={480} height={360} alt={video.snippet.title}/>
              <div className="absolute bottom-0 left-0 right-0 bg-black opacity-90 text-white text-center py-2 px-4">
                {renameYTVideo(video)}
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="events">
        <h2>Eventos</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {events.map((event) => <EventItem key={event.id} event={event} />)}
        </div>
      </section>

      <section id="gcs" className="">
        <h2>GCs</h2>
        <p>
          Um GC (Grupo de Crescimento) é como a igreja se encontra nas casas, exatamente como foi pensado na Bíblia. É o lugar onde você não é apenas mais um na multidão, mas alguém que vai ser cuidado, ouvido e acompanhado de perto.
        </p>
        <iframe
          className="w-full h-[220px]"
          src={`${gcURL}/embed?type=carousel&map=0`}
          title="YouTube video player" frameBorder="0"
          allow="clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>

        <div className="mt-2 text-center">
          <Button asLink href={gcURL}>venha conhecer um GC</Button>
        </div>

      </section>

      {/* <section id="prayers" className="grid grid-cols-3 gap-4">
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
      </section> */}

      <section id="colaborate">
        <h2>Colabore</h2>
        <div className="flex flex-col sm:flex-row justify-evenly gap-4 sm:gap-8 md:gap-12">
          {transfers.map((transfer) => (
            <div key={transfer.pix} className="w-full lg:w-1/2 flex flex-col items-center gap-4 mb-8 wrap-anywhere">
              <div className="flex flex-row p-4 gap-4 rounded-md text-sm border border-[var(--background-dark)]">
                <Image src={transfer.bank_icon} width={40} height={40} alt="" className="" style={{ objectFit: "contain" }} />

                <div>
                  <div className="flex flex-row items-center mb-2">
                    {transfer.bank} - Ag. {transfer.agency} - Conta. {transfer.account}
                  </div>

                  <div className="">
                    PIX ({transfer.pix_key_type})<br />
                    {transfer.pix}
                  </div>
                </div>
              </div>
              <Image src={transfer.qrcode} width={320} height={320} alt="" />
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-16 py-8 border-t text-gray-500">
        <div className="flex flex-row justify-between">
          <div className="">
            <h4 className="text-xl font-semibold">Programação</h4>
            <ul className="list-none mt-2 grid grid-cols-1 gap-2">
              {worships.map((worship) => (
                <li key={worship.id}>
                  {worship.descricao}
                </li>
              ))}
            </ul>
          </div>

          <div className="">
            <h4 className="text-xl font-semibold">Ministérios</h4>
            <ul className="list-none mt-2 grid grid-cols-2 gap-2">
              {ministries.map((entry) => (
                <li key={entry.id}>
                  {entry.nome.replace(/Ministério\s?(de\s?)?/, '')}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a href={churchDirectionUrl} target="_blank">{church.endereco}</a>
        </div>
        <div className="mt-2 text-xs text-center">
          &copy; {new Date().getFullYear()} {church.nome || "Igreja"} - Todos os direitos reservados. | Powered by <a href="https://www.inpeace.com.br" target="_blank" rel="noopener noreferrer" className="hover:underline">Inpeace</a>
        </div>
      </footer>
    </main>
  );
}
