import {NextResponse} from 'next/server'
import {inPeaceServiceEventById} from '@/service/inpeace'

export async function GET(request, {params}) {
  const {id} = (params ?? {})
  const result = await inPeaceServiceEventById(id)
  return NextResponse.json(result)
}