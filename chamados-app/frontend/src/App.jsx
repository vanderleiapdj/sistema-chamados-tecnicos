import { Outlet, Link } from 'react-router-dom'
export default function App(){
  return (
    <div className="min-h-screen p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Sistema de Chamados</h1>
        <nav className="mt-2"><Link to="/">Dashboard</Link> | <Link to="/new">Novo Chamado</Link></nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}