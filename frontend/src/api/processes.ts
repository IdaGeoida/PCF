import axios from 'axios'
import { Process } from '../types'

export function getProcesses() {
  return axios.get<Process[]>('/api/processes/')
}
