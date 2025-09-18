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
  // so vai ter valor quando pegar o evento pelo id
  descricao: string
  enderecos: Address[]
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

export interface Address {
  id: number
  logradouro: string
  numero: string
  categoria: any
  complemento: any
  bairro: string
  cidade: string
  estado: string
  pais: Pais
  codigoPostal: string
  latitude: number
  longitude: number
  enderecoCompleto: string
  igreja?: Igreja
}

export interface Pais {
  id: number
  nome: string
  codigo: string
}

export interface Igreja {
  [key: string]: any
}
