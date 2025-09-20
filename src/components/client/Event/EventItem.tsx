'use client'

import Image from 'next/image'
import ModalInterface from '@/components/client/Modal/ModalInterface'
import {EventResponse} from '@/interface/inpeace/events'
import {useEffect, useState } from 'react'
import {inPeaceServiceEventById} from '@/service/inpeace'
import {eventById} from '@/service/api'
import {formateDateLocale, formateTimeLocale} from '@/date/date'
import {convertInPeaceAddress, formatAddress} from '@/address/address'
import {generateMapUrl} from '@/map/map'

interface EventItemProps {
  event: EventResponse
}
export default function EventItem(props:EventItemProps) {
  const {event} = props

  const [selectedEvent, setSelectedEvent] = useState<EventResponse | null>(null)
  const [loadedEvent, setLoadedEvent] = useState<EventResponse | null>(null)

  const addr = convertInPeaceAddress(loadedEvent?.enderecos?.[0])
  const addrFormated = formatAddress(addr)
  const hasCoord = addr?.coordinates?.lat && addr?.coordinates?.lng
  const mapAddrUrl = hasCoord ? generateMapUrl(addr.coordinates!) : '#'

  const handleClose = () => {
    setSelectedEvent(null)
    setLoadedEvent(null)
  }

  useEffect(() => {
    if(!selectedEvent){
      return
    }

    eventById(selectedEvent.id).then((evt)=>{
      setLoadedEvent(evt)
    })
  }, [selectedEvent])
  return (
    <>
      <div className="group relative cursor-pointer" key={event.id} onClick={() => setSelectedEvent(event)}>
        <Image src={event.image._optimized[0].url} width={470} height={370} alt={event.nome}/>
        <div
          className="absolute inset-0 bg-[var(--foreground)] transition-opacity duration-700 opacity-0 group-hover:opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-700 opacity-0 group-hover:opacity-100">
          <i className="uil uil-eye text-[var(--background)] text-4xl"/>
        </div>
      </div>

      <ModalInterface open={!!selectedEvent} onClose={handleClose} title={event.nome}>
        <div id="event-detail">
          {!loadedEvent && (
            <div className="text-center">
              <i className="uil uil-spinner-alt animate-spin text-4xl inline-block" />
            </div>
          )}
          {loadedEvent && (
            <>
              <ul>
                <li>
                  <span className="datetime_date">Data:</span>
                  <span className="">{formateDateLocale(new Date(event.dataInicio))}</span>
                </li>
                <li>
                  <span className="datetime_date">Horário:</span>
                  <span className="">
                    {formateTimeLocale(new Date(event.dataInicio))}
                        &nbsp;às&nbsp;
                        {formateTimeLocale(new Date(event.dataFim))}
                  </span>
                </li>

                {addrFormated && (
                  <li>
                    <span className="location_address">Localização:</span>

                    <a href={mapAddrUrl} target="_blank" rel="noreferrer">
                      <span className="">{addrFormated}</span>
                      {hasCoord && (<i className="uil ml-2 uil-external-link-alt" />)}
                    </a>
                  </li>
                )}
              </ul>
              <div className="w-full flex justify-center my-4">
                <img src={event.image._optimized[0].url} alt={event.nome} className="object-cover w-full h-[300px]"/>
              </div>
              <div className="description mt-6" dangerouslySetInnerHTML={{__html: loadedEvent?.descricao ?? ''}} />
            </>)}
        </div>
      </ModalInterface>
    </>
  )
}