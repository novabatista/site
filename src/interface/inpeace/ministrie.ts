export type MinistriesResponse = MinistrieEntry[]

export interface MinistrieEntry {
  id: number
  nome: string
  detalhes: string
  responsavel: string
  imageName: any
  email?: string
  telefone: string
  dataCadastro: string
  flagAtivo: boolean
  usuario: string
}
