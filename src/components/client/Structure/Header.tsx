import Image from 'next/image'

export default function Header({visual}) {
  return (
    <header className="flex justify-center items-center">
      <Image src={visual.logomarcaMenu._optimized[0].url} width={200} height={65} alt="Nova Batista" />
    </header>
  )
}