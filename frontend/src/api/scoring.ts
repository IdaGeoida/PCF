import axios from 'axios'
import { ScoreInput } from '../types'

const API = axios.create({ baseURL: 'http://localhost:8000/api' })

export function sendScores(data: ScoreInput[]) {
  return API.post<{ overall: number; by_process: Record<number, number> }>('/scoring/', data)
}
