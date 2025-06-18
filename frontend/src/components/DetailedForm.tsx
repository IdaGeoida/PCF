import { Controller, useForm } from 'react-hook-form'
import { Applicability, Process } from '../types'
import { ScoreInput } from '../types'

interface Props {
  processes: Process[]
  applicability: Record<string, Applicability>
  onSubmit: (scores: ScoreInput[]) => void
}

export function DetailedForm({ processes, applicability, onSubmit }: Props) {
  const { control, handleSubmit } = useForm<Record<string, number>>()
  const filtered = processes.filter(p => applicability[p.id.toString()] !== Applicability.NZ)

  return (
    <form
      onSubmit={handleSubmit(values => {
        const payload: ScoreInput[] = filtered.map(p => ({
          process_id: p.id,
          level_general: Number(values[`general-${p.id}`] ?? 0),
          level_detailed: Number(values[`detailed-${p.id}`] ?? 0),
          level_extension: values[`extension-${p.id}`] === undefined || values[`extension-${p.id}`] === null ? undefined : Number(values[`extension-${p.id}`])
        }))
        onSubmit(payload)
      })}
    >
      {filtered.map(p => (
        <div key={p.id} style={{ marginBottom: '1rem' }}>
          <h4>{p.name}</h4>
          <label>
            General
            <Controller name={`general-${p.id}`} control={control} defaultValue={0} render={({ field }) => <input type="number" {...field} />} />
          </label>
          <label>
            Detailed
            <Controller name={`detailed-${p.id}`} control={control} defaultValue={0} render={({ field }) => <input type="number" {...field} />} />
          </label>
          <label>
            Extension
            <Controller name={`extension-${p.id}`} control={control} render={({ field }) => <input type="number" {...field} />} />
          </label>
        </div>
      ))}
      <button type="submit">Oblicz</button>
    </form>
  )
}
