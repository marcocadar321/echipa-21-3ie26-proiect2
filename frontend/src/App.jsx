import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Produse from './pages/Produse';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Sincronizarea modulul Dark Mode cu HTML-ul pentru Tailwind
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="min-h-screen bg-white text-zinc-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-50">
        
        {/* HEADER-ul tău (Navbar-ul) pus exact unde a indicat Marco, vizibil pe toate paginile */}
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        
        <main>
          <Routes>
            {/* Ruta pentru pagina ta de Produse */}
            <Route path="/produse" element={<Produse />} />
            
            {/* Ruta temporară pentru prima pagină, ca să nu fie goală */}
            <Route path="/" element={<Produse />} />
            
            {/* Tot aici vor adăuga și ceilalți colegi rutele lor ulterior (ex: /despre, /contact) */}
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;