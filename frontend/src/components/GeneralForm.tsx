import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { getProcesses } from '../api/processes';
import { Applicability, Process } from '../types';

export type FormValues = { [id: string]: Applicability };

const GeneralForm: React.FC = () => {
  const { control, handleSubmit } = useForm<FormValues>();
  const [processes, setProcesses] = useState<Process[]>([]);

  useEffect(() => {
    getProcesses()
      .then(setProcesses)
      .catch((err) => console.error('Failed to fetch processes', err));
  }, []);

  const onSubmit = (data: FormValues) => {
    console.log('Selected values', data);
    return data;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {processes.map((process) => (
        <div key={process.id} style={{ marginBottom: '1rem' }}>
          <label htmlFor={`process-${process.id}`}>{process.name}</label>
          <Controller
            name={String(process.id)}
            control={control}
            defaultValue={process.applicability}
            render={({ field }) => (
              <select {...field} id={`process-${process.id}`}>
                {Object.values(Applicability).map((app) => (
                  <option key={app} value={app}>
                    {app}
                  </option>
                ))}
              </select>
            )}
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default GeneralForm;
