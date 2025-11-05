const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'
export async function createTicket(payload){
  const res = await fetch(`${API_BASE}/tickets`,{
    method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)
  })
  return res.json()
}
export async function listTickets(){
  const res = await fetch(`${API_BASE}/tickets`)
  return res.json()
}