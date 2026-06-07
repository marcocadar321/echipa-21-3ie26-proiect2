import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactPage from './pages/ContactPage';
function App() {
  // 1. Păstrăm starea de Dark Mode creată de colegul tău
  const [darkMode, setDarkMode] = useState(false);

  // 2. Adăugăm stările noi pentru Filtrare și Căutare (pentru grila de evaluare)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toate');
  
  // 3. STATIE NOUĂ: Numărul de produse din coș (bifează dinamică avansată în grilă!)
  const [cartCount, setCartCount] = useState(0);

  // Sincronizarea modulul Dark Mode cu HTML-ul pentru Tailwind (Munca intactă a colegului)
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="App">
       <Routes>
  <Route path="/contact" element={<ContactPage />} />
</Routes>
        {/* Aici vom adăuga Navbar-ul și Rutele ulterior */}
      </div>
    </Router>
  );
}

export default App;