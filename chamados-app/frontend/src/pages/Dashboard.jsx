import { useEffect, useState } from 'react'
import { listTickets } from '../services/api'

export default function Dashboard(){
  const [tickets, setTickets] = useState([])
  useEffect(()=>{ listTickets().then(setTickets) },[])
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Chamados Recentes</h2>
      <ul>
        {tickets.map(t=> (
          <li key={t.id} className="mb-2">
            <strong>{t.title}</strong> — <span>{t.status}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}