// frontend/src/components/GeneralForm.tsx

import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { getProcesses } from '../api/processes';
import { Process, Applicability } from '../types';

interface FormValues {
  // klucze to stringi (id procesu zamienione na string)
  [processId: string]: Applicability;
}

export function GeneralForm({
  onNext,
}: {
  onNext: (values: FormValues) => void;
}) {
  const { control, handleSubmit } = useForm<FormValues>();
  const [processes, setProcesses] = useState<Process[]>([]);

  useEffect(() => {
    getProcesses().then((res) => setProcesses(res.data));
  }, []);

  return (
    <form onSubmit={handleSubmit(onNext)}>
      <h2>Poziom ogólny</h2>
      {processes.map((p) => (
        <div key={p.id} style={{ marginBottom: '1rem' }}>
          <label htmlFor={`proc-${p.id}`}>{p.name}</label>
          <Controller
            name={p.id.toString()}
            control={control}
            defaultValue={Applicability.MZ}
            render={({ field }) => (
              <select {...field} id={`proc-${p.id}`}>
                <option value={Applicability.MZ}>MZ</option>
                <option value={Applicability.WP}>WP</option>
                <option value={Applicability.NZ}>NZ</option>
              </select>
            )}
          />
        </div>
      ))}
      <button type="submit">Dalej</button>
    </form>
  );
}
