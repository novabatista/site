import loader from '@/loader/loader'

export default async function Footer() {
  const assets = await loader.load({
    church: true,
    ministries: true,
    worships: true,
  })

  const {
    church,
    ministries,
    worships,
  } = assets

  const churchDirectionUrl = `https://www.google.com/maps/dir//${church.latitude},${church.longitude}`

  return (
    <footer className="mt-16 py-8 border-t text-gray-500">
      <div className="flex flex-col md:flex-row justify-between gap-8">
        <div className="">
          <h4 className="text-xl font-semibold">Programação</h4>
          <ul className="list-none mt-2 grid grid-cols-1 gap-2">
            {worships.map((worship) => (
              <li key={worship.id}>
                {worship.descricao}
              </li>
            ))}
          </ul>
        </div>

        <div className="">
          <h4 className="text-xl font-semibold">Links</h4>
          <ul className="list-none mt-2 grid grid-cols-3 md:grid-cols-1 gap-2">
            <li>
              <a href="https://linktr.ee/novabatistadotatuape" target="_blank" rel="noreferrer">
                Linktree
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/novabatistatatuape/" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/@novabatistadotatuape" target="_blank" rel="noreferrer">
                YouTube
              </a>
            </li>
          </ul>
        </div>

        <div className="">
          <h4 className="text-xl font-semibold">Ministérios</h4>
          <ul className="list-none mt-2 grid grid-cols-2 gap-2">
            {ministries.map((entry) => (
              <li key={entry.id}>
                {entry.nome.replace(/Ministério\s?(de\s?)?/, '')}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 text-center">
        <a href={churchDirectionUrl} target="_blank">{church.endereco}</a>
      </div>

      <div className="mt-2 text-xs text-center">
        &copy; {new Date().getFullYear()} {church.nome || "Igreja"} - Todos os direitos reservados. | Powered by <a href="https://inpeaceapp.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Inpeace</a>
      </div>
    </footer>
  )
}