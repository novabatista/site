'use client'

import {useState, useRef, useEffect, useMemo} from 'react'
import useBreakpoint, {MatcherEntries} from '@/hook/useBreakpoint'

interface SwiperProps {
  children: React.ReactNode[]
  controls?: boolean
  perPage?: number | MatcherEntries
}

const GAP = 8
export default function Swiper(props: SwiperProps) {
  const {children, controls = true, perPage} = props

  const containerRef = useRef(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [itemWidth, setItemWidth] = useState(0)
  const breakpoint = useBreakpoint()

  const perPageCount = useMemo(() => {
    if (typeof perPage === 'number') {
      return perPage;
    } else if (perPage) {
      return breakpoint.matcher(perPage) || 1;
    }
    return 10;
  }, [perPage, breakpoint]);


  const itemsSize = children.length
  const totalPages = Math.ceil( itemsSize/ perPageCount)

  const isControlsVisible = controls && itemsSize > perPageCount


  const handlePrevItem = () => {
    const newPage = currentPage - 1 < 0 ? totalPages - 1 : currentPage - 1
    setCurrentPage(newPage)
  }

  const handleNextItem = () => {
    const newPage = (currentPage + 1) % totalPages
    setCurrentPage(newPage)
  }

  useEffect(() => {
    if (!containerRef.current) {
      return
    }
    // @ts-expect-error no error
    const containerWidth = containerRef.current.clientWidth
    const totalGaps = perPageCount - 1
    const availableWidth = containerWidth - (totalGaps * GAP)
    setItemWidth(Math.floor(availableWidth / perPageCount))

    // @ts-expect-error no error
  }, [perPageCount, containerRef.current?.clientWidth]);

  useEffect(() => {
    if (!containerRef.current) {
      return
    }
    const offset = currentPage * (itemWidth + GAP) * perPageCount

    // @ts-expect-error no error
    containerRef.current.scrollTo({
      left: offset,
      behavior: 'smooth',
    })
  }, [currentPage, perPageCount, itemWidth])


  return (
    <div className="relative flex flex-row justify-center items-center">
      {isControlsVisible && <i className="uil uil-angle-left-b text-5xl cursor-pointer" onClick={handlePrevItem}/>}
      <div
        ref={containerRef}
        className={`swiper-container w-full flex overflow-x-auto gap-2`}
      >
        {children.map((child, index) => (
          <div key={index} style={{width: itemWidth, flexShrink: 0}}>
            {child}
          </div>
        ))}
      </div>
      {isControlsVisible && <i className="uil uil-angle-right-b text-5xl cursor-pointer" onClick={handleNextItem}/>}
    </div>
  )
}
