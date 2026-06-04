import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import Meniu  from './Meniu'

const PaginaSimple = ({ titlu }) => (
  <div style={{ textAlign: 'center', padding: '80px 24px' }}>
    <h1 style={{ fontSize: 28, color: '#be185d', fontFamily: 'serif' }}>{titlu}</h1>
    <p style={{ color: '#9d6b8a', marginTop: 8 }}>Această pagină este în construcție.</p>
  </div>
)

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"           element={<Meniu />} />
        <Route path="/aranjamente" element={<Meniu />} />
        <Route path="/meniu"      element={<Meniu />} />
        <Route path="/despre"     element={<PaginaSimple titlu="Despre noi" />} />
        <Route path="/contact"    element={<PaginaSimple titlu="Contact" />} />
        <Route path="/comanda"    element={<PaginaSimple titlu="Comandă" />} />
        <Route path="*"           element={<Meniu />} />
      </Routes>
    </BrowserRouter>
  )
}
