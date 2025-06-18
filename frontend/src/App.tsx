import { useEffect, useState } from 'react'
import { Applicability, Process, ScoreInput } from './types'
import { getProcesses } from './api/processes'
import { GeneralForm } from './components/GeneralForm'
import { ResultsView } from './components/ResultsView'
import axios from 'axios'

export default function App() {
  const [step, setStep] = useState<'general' | 'scores' | 'results'>('general')
  const [processes, setProcesses] = useState<Process[]>([])
  const [applicability, setApplicability] = useState<Record<number, Applicability>>({})
  const [results, setResults] = useState<{overall:number; by_process: Record<number,number>} | null>(null)

  useEffect(() => {
    getProcesses().then(res => setProcesses(res.data))
  }, [])

  const handleGeneral = (vals: Record<number, Applicability>) => {
    setApplicability(vals)
    setStep('scores')
  }

  const handleScores = (scores: ScoreInput[]) => {
    axios.post('/api/scoring/', scores).then(res => {
      setResults(res.data)
      setStep('results')
    })
  }

  return (
    <div>
      {step === 'general' && <GeneralForm processes={processes} onNext={handleGeneral} />}
      {step === 'scores' && <ScoreForm processes={processes} applicability={applicability} onSubmit={handleScores} />}
      {step === 'results' && results && <ResultsView data={results.by_process} overall={results.overall} />}
    </div>
  )
}

function ScoreForm({ processes, applicability, onSubmit }:{ processes: Process[]; applicability: Record<number, Applicability>; onSubmit:(data:ScoreInput[])=>void }) {
  const [values, setValues] = useState<Record<string,string>>({})
  const filtered = processes.filter(p => applicability[p.id] !== Applicability.NZ)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues(v => ({...v, [e.target.name]: e.target.value}))
  }

  const handleSend = () => {
    const data = filtered.map(p => ({
      process_id: p.id,
      level_general: Number(values[`g-${p.id}`]||0),
      level_detailed: Number(values[`d-${p.id}`]||0),
      level_extension: values[`e-${p.id}`] ? Number(values[`e-${p.id}`]) : undefined,
    }))
    onSubmit(data)
  }

  return (
    <div>
      {filtered.map(p => (
        <div key={p.id}>
          <h4>{p.name}</h4>
          <input name={`g-${p.id}`} placeholder="general" onChange={handleChange} />
          <input name={`d-${p.id}`} placeholder="detailed" onChange={handleChange} />
          <input name={`e-${p.id}`} placeholder="extension" onChange={handleChange} />
        </div>
      ))}
      <button onClick={handleSend}>Compute</button>
    </div>
  )
}
