// src/api/processes.ts
import axios from 'axios';
import { Process } from '../types';

const API = axios.create({ baseURL: 'http://localhost:8000/api' });

export function getProcesses() {
  return API.get<Process[]>('/processes/');
}
