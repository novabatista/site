import Main from '@/components/client/Structure/Main'
import Header from '@/components/client/Structure/Header'
import {inPeaceServiceDevocional} from '@/service/inpeace'
import Footer from '@/components/client/Structure/Footer'
import type { Metadata, ResolvingMetadata } from 'next'

let devotionals: any[] = []
let devotional:any
const devotionalLoader = async ()=>{
  if(devotional){
    return devotional
  }

  devotionals = await inPeaceServiceDevocional()
  devotional = devotionals[0]
}

export async function generateMetadata(): Promise<Metadata> {
  await devotionalLoader()

  return {
    title: devotional.descricao,
    description: 'Devocional do dia',
    openGraph: {
      title: devotional.descricao,
      description: 'Devocional do dia',
      images: [
        {
          url: devotional.image._optimized[0].url,
          width: 1200,
          height: 630,
          alt: devotional.descricao,
        }
      ],
    },
  }
}

export default async function DevocionalPage() {
  await devotionalLoader()

  const image = devotional.image._optimized[0].url
  return (
    <Main>
      <Header />
      <div id="devotional-detail">
        <div className="relative w-full flex justify-center my-4 overflow-hidden rounded-t-lg">
          <img src={image} alt={devotional.descricao} className="object-cover w-full h-[320px] object-top absolute inset-0 opacity-70 blur-md scale-110 z-0"/>
          <img src={image} alt={devotional.descricao} className="object-contain w-full h-[320px] z-10"/>
        </div>

        <h1 className="text-2xl font-semibold">{devotional.descricao}</h1>
        <hr className="my-2" />
        <div className="description mt-6" dangerouslySetInnerHTML={{__html: devotional.conteudo}} />
      </div>
      <Footer />
    </Main>
  )
}