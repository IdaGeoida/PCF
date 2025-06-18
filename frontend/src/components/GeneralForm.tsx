import { useForm, Controller } from 'react-hook-form'
import { Applicability, Process } from '../types'

interface Props {
  processes: Process[]
  onNext: (vals: Record<number, Applicability>) => void
}

export function GeneralForm({ processes, onNext }: Props) {
  const { control, handleSubmit } = useForm<Record<string, Applicability>>()

  return (
    <form onSubmit={handleSubmit((vals) => {
      const data: Record<number, Applicability> = {}
      for (const k of Object.keys(vals)) {
        data[Number(k)] = vals[k]
      }
      onNext(data)
    })}>
      {processes.map(p => (
        <div key={p.id}>
          <label>{p.name}</label>
          <Controller
            name={p.id.toString()}
            control={control}
            defaultValue={Applicability.MZ}
            render={({ field }) => (
              <select {...field}>
                <option value={Applicability.MZ}>MZ</option>
                <option value={Applicability.WP}>WP</option>
                <option value={Applicability.NZ}>NZ</option>
              </select>
            )}
          />
        </div>
      ))}
      <button type="submit">Next</button>
    </form>
  )
}
