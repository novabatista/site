import Main from '@/components/client/Structure/Main'
import Header from '@/components/client/Structure/Header'
import {inPeaceServiceDevocional, inPeaceServiceVisual} from '@/service/inpeace'

export default async function DevocionalPage() {
  const visual = await inPeaceServiceVisual()
  const devotionals = await inPeaceServiceDevocional()
  const devotional = devotionals[0]
  const image = devotional.image._optimized[0].url
  return (
    <Main>
      <Header visual={visual} />
      <div id="devotional-detail">
        <div className="relative w-full flex justify-center my-4 overflow-hidden rounded-t-lg">
          <img src={image} alt={devotional.descricao} className="object-cover w-full h-[320px] object-top absolute inset-0 opacity-70 blur-md scale-110 z-0"/>
          <img src={image} alt={devotional.descricao} className="object-contain w-full h-[320px]"/>
        </div>

        <h1 className="text-2xl font-semibold">{devotional.descricao}</h1>
        <hr className="my-2" />
        <div className="description mt-6" dangerouslySetInnerHTML={{__html: devotional.conteudo}} />
      </div>
    </Main>
  )
}