export interface ChurchVisualResponse {
  logomarcaMenu: LogomarcaMenu
  logomarcaLogin: LogomarcaLogin
  imagemFundoMenu: any
  flagVideoFundo: boolean
  videoFundoMenu: VideoFundoMenu
  tipoTelaInicialApp: string
  corApp: string
  hashAlteracao: string
}

export interface LogomarcaMenu {
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

export interface LogomarcaLogin {
  id: number
  imageName: string
  mimeType: string
  originalName: string
  url: string
  _optimized: Optimized2[]
}

export interface Optimized2 {
  type: string
  url: string
}

export interface VideoFundoMenu {
  id: number
  imageName: string
  mimeType: string
  originalName: string
  url: string
}
