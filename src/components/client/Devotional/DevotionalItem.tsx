'use client'

import ModalInterface from '@/components/client/Modal/ModalInterface'
import {useState} from 'react'
import {Devotional} from '@/interface/inpeace/devotional'

export default function DevotionalItem({devotional}) {
  const [selectedDevotional, setSelectedDevotional] = useState<Devotional | null>(null)

  const handleSelectItem = ()=>setSelectedDevotional(devotional)
  const handleClose = () => {
    setSelectedDevotional(null)
  }

  return (
    <>
      <div className="p-4 border rounded flex flex-row justify-between h-full gap-4 cursor-pointer" onClick={handleSelectItem}>
        <div className="w-full h-full">
          <img className="w-full h-full object-cover" src={devotional.image._optimized[0].url} alt="" />
        </div>
        <div>
          <span className="font-semibold">{devotional.descricao}</span>
          <hr className="my-2" />
          <div dangerouslySetInnerHTML={{__html:devotional.conteudo.substring(0, 120)+'...'}} />
        </div>
      </div>

      <ModalInterface open={!!selectedDevotional} onClose={handleClose} title={devotional.descricao}>
        <div id="devotional-detail">
          <div className="w-full flex justify-center my-4">
            <img src={devotional.image._optimized[0].url} alt={devotional.descricao} className="object-cover object-top w-full h-[320px]"/>
          </div>
          <div className="description mt-6" dangerouslySetInnerHTML={{__html: devotional.conteudo}} />
        </div>
      </ModalInterface>
    </>
  )
}