import { useEffect, useState } from 'react'
import { Applicability, Process, ScoreInput } from './types'
import { getProcesses } from './api/processes'
import { sendScores } from './api/scoring'
import { GeneralForm } from './components/GeneralForm'
import { DetailedForm } from './components/DetailedForm'
import { ResultsView } from './components/ResultsView'
import './App.css'

function App() {
  const [step, setStep] = useState<'general' | 'detail' | 'results'>('general')
  const [processes, setProcesses] = useState<Process[]>([])
  const [applicability, setApplicability] = useState<Record<string, Applicability>>({})
  const [results, setResults] = useState<{ overall: number; by_process: Record<number, number> } | null>(null)

  useEffect(() => {
    getProcesses().then((res) => setProcesses(res.data))
  }, [])

  const handleGeneral = (vals: Record<string, Applicability>) => {
    setApplicability(vals)
    setStep('detail')
  }

  const handleScores = (scores: ScoreInput[]) => {
    sendScores(scores).then((res) => {
      setResults(res.data)
      setStep('results')
    })
  }

  return (
    <div>
      {step === 'general' && <GeneralForm onNext={handleGeneral} />}
      {step === 'detail' && (
        <DetailedForm processes={processes} applicability={applicability} onSubmit={handleScores} />
      )}
      {step === 'results' && results && <ResultsView data={results.by_process} overall={results.overall} />}
    </div>
  )
}

export default App
