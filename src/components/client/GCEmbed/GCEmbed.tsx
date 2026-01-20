'use client'

import useBreakpoint from '@/hook/useBreakpoint'

export default function GCEmbed({gcURL}) {
  const breakpoint = useBreakpoint()
  return (
    <iframe
      className="w-full h-[220px]"
      src={`${gcURL}/embed?type=carousel&map=0&perpage=${breakpoint.matcher({'base':1, 'sm': 1, 'md':2, 'xl':3})}`}
      title="GCs" frameBorder="0"
      allow="clipboard-write; encrypted-media; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
    ></iframe>
  )
}