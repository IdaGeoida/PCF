import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts'

interface Props {
  data: Record<number, number>
  overall: number
}

export function ResultsView({ data, overall }: Props) {
  const chartData = Object.entries(data).map(([id, value]) => ({ id, value }))
  return (
    <div>
      <h2>Wynik ogólny: {overall.toFixed(2)}</h2>
      <table>
        <thead>
          <tr>
            <th>Proces</th>
            <th>Średnia</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([id, val]) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{val.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="id" />
          <YAxis />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
