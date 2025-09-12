export interface PrayerResponse {
  id: number
  nome: string
  mensagem: string
  motivo: string
  flagReceberVisita: string
  flagReceberLigacao: string
  flagPublicarMural: string
  dataCadastro: string
  flagAtivo: string
  idUsuario: number
  usuario: string
  oracaoMotivo?: string
  cidade?: string
  estado?: string
  pais?: string
  imageName?: string
  totalOrando: string
  orando: Orando[]
  imageOptimized?: ImageOptimized[]
}

export interface Orando {
  id: number
  dataCadastro: string
  flagAtivo: string
  usuario: string
  idUsuario: number
}

export interface ImageOptimized {
  type: string
  url: string
}
