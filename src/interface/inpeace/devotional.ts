export interface DevotionalsResponse {
  devocionais: Devotional[]
}

export interface Devotional {
  id: number
  descricao: string
  conteudo: string
  incorporacao: any
  categorias: Categoria[]
  arquivos: any[]
  flagAtivo: boolean
  dataCadastro: string
  dataUltimaAlteracao?: string
  dataPublicacao: string
  image: Image
}

export interface Categoria {
  id: number
  nome: string
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
