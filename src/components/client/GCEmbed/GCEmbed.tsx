'use client'

import useBreakpoint from '@/hook/useBreakpoint'
import { useEffect, useState } from 'react'

export default function GCEmbed({gcURL}) {
  const breakpoint = useBreakpoint()
  const [mounted, setMounted] = useState(false)

  const itemsPerPage = breakpoint.matcher({'base':1, 'sm': 1, 'md':2, 'xl':3})
  const gcsSrc = `${gcURL}/embed?type=carousel&map=0&perpage=${itemsPerPage}`

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <iframe
      className="w-full h-[220px]"
      src={gcsSrc}
      title="GCs" frameBorder="0"
      allow="clipboard-write; encrypted-media; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
    ></iframe>
  )
}