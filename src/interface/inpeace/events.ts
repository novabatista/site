export interface EventResponse {
  id: number
  flagPossuiConteudo: boolean
  nome: string
  tipo: string
  dataInicio: string
  dataFim: string
  image: Image
  igreja: any
  local: any
}

export interface Image {
  id: number
  imageName: string
  mimeType: string
  originalName: string
  url: string
  _optimized: Optimized[]
}

export interface Optimized {
  type: string
  url: string
}
