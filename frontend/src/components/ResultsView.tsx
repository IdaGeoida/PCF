import { BarChart, Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts'

export function ResultsView({ data, overall }:{ data: Record<number, number>; overall: number }) {
  const chartData = Object.entries(data).map(([id, value]) => ({ id, value }))
  return (
    <div>
      <h3>Overall: {overall.toFixed(2)}</h3>
      <table>
        <tbody>
          {Object.entries(data).map(([id,v]) => (
            <tr key={id}><td>{id}</td><td>{v.toFixed(2)}</td></tr>
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
