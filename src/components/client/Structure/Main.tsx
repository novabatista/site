import Image from 'next/image'

export default function Main({children}) {
  return (
    <main className="w-11/12 sm:max-w-10/12 md:max-w-8/12 m-auto">
      {children}
    </main>
  )
}