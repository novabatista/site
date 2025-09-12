export interface WorshipResponse {
  id: number
  tempoDuracao: string
  titulo: string
  flagAtivo: boolean
  flagEnviarNotificacao: boolean
  flagAoVivo: boolean
  flagChat: boolean
  flagRecorrente: boolean
  image: any
  data: any
  descricao: string
  canalChat: any
  recorrencias: Recorrencia[]
}

export interface Recorrencia {
  id: number
  diaSemana: number
  diaSemanaUtcProximaOcorrencia: number
  hora: string
  horaUtcProximaOcorrencia: string
  canalChat: any
}
