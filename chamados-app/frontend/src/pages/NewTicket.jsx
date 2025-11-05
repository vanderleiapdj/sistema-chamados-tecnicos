import { useState } from 'react'
import { createTicket } from '../services/api'

export default function NewTicket(){
  const [form, setForm] = useState({ title:'', description:'', equipment:'', priority:'media' })
  async function submit(e){
    e.preventDefault()
    await createTicket(form)
    alert('Chamado criado!')
  }
  return (
    <form onSubmit={submit} className="max-w-xl">
      <div><label>Título</label><input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required/></div>
      <div><label>Descrição</label><textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></div>
      <div><label>Equipamento</label><input value={form.equipment} onChange={e=>setForm({...form,equipment:e.target.value})}/></div>
      <div><label>Prioridade</label>
        <select value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})}>
          <option value="baixa">baixa</option>
          <option value="media">média</option>
          <option value="alta">alta</option>
        </select>
      </div>
      <button type="submit">Criar</button>
    </form>
  )
}