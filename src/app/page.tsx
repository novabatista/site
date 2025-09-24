import Image from 'next/image'
import {YoutubeItemEntry} from '@/interface/youtube/search'
import Button from '@/components/server/Button'
import EventItem from '@/components/client/Event/EventItem'
import Swiper from '@/components/client/Swiper/Swiper'
import DevotionalItem from '@/components/client/Devotional/DevotionalItem'
import Main from '@/components/client/Structure/Main'
import Footer from '@/components/client/Structure/Footer'
import Header from '@/components/client/Structure/Header'
import loader from '@/loader/loader'

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

export default async function Home() {
  const assets = await loader.load({
    church: true,
    events: true,
    devotionals: true,
    latestVideos: true,
    liveVideo: true,
  })

  const {
    church,
    events,
    devotionals,
    liveVideo,
  } = assets

  let latestVideos = assets.latestVideos
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
    <Main>
      <Header />

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

      <section id="devotional">
        <h2>Devocional</h2>
        <Swiper perPage={{
          'base': 1,
          'sm': 2,
        }}>
          {devotionals.map((devotional) => <DevotionalItem data-id={devotional.id} key={devotional.id} devotional={devotional} />)}
        </Swiper>
      </section>

      {(church.urlAppleStore || church.urlAppleStore) && (
        <section id="app">
          <h2>Baixe nosso app</h2>
          <div className="flex flex-row justify-center gap-4">
            {church.urlAppleStore && <a href={church.urlAppleStore}>
              <picture>
                <Image width={180} height={56} className="app-store" src="/btnAppstore.png" alt="Download na App Store" />
              </picture>
            </a>
            }

            {church.urlGooglePlay && <a href={church.urlGooglePlay} target="_blank" rel="noreferrer">
              <picture>
                <Image width={180} height={56} className="app-store" src="/btnGoogleplay.png" alt="Download na Google Play" />
              </picture>
            </a>
            }
          </div>
        </section>
      )}

      <Footer />

    </Main>
  );
}
