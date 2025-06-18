import axios from 'axios';
import { Process } from '../types';

const api = axios.create({ baseURL: 'http://localhost:8000/api' });

export async function getProcesses(): Promise<Process[]> {
  const { data } = await api.get<Process[]>('/processes');
  return data;
}
