export interface ChurchResponse {
  id: number
  nome: string
  email: string
  descricao: string
  codigo: string
  endereco: string
  telefone: string
  historia: any
  idioma: string
  pais: string
  dataCadastro: DataCadastro
  flagAtivo: boolean
  idYouTubeChannel: any
  servicoStreaming: string
  idCanalStreaming: string
  idYouTubeLiveChannel: string
  moeda: string
  timezone: string
  site: string
  urlStreaming: any
  urlAppleStore: string
  urlGooglePlay: string
  urlGatewayPagamentoExterno: string
  urlBibliaExterna: string
  denominacao: string
  longitude: string
  latitude: string
  flagChatBot: boolean
  flagEstudosApenasLideres: boolean
  urlVideoYoutube: any
  codigoPlano: string
  slugOrganizacao: any
  slug: string
  facebookPixelCode: any
  hostname: string
  uuid: string
  perfilCliente: PerfilCliente
  logomarcas: any[]
  imagens: string[]
  flagPermitirDoacao: number
  idGatewayPagamento: any
  termos: Termos
  usuarioResponsavel: UsuarioResponsavel
  facebook: any
  instagram: any
  redesSociais: any[]
}

export interface DataCadastro {
  date: string
  timezone_type: number
  timezone: string
}

export interface PerfilCliente {
  id: number
  descricao: string
}

export interface Termos {
  celula: string
  celulas: string
  jornadadomembro: string
}

export interface UsuarioResponsavel {
  nome: string
  email: string
  telefone: string
}
