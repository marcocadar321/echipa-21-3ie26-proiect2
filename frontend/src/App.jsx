import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Produse from './pages/Produse';

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
      <div className="min-h-screen bg-white text-zinc-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-50">
        
        {/* HEADER-ul tău (Navbar-ul):
          Trimitem Dark Mode-ul, stările de căutare/categorii ȘI numărul din coș (cartCount)
        */}
        <Header 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          cartCount={cartCount} 
        />
        
        <main>
          <Routes>
            {/* Rutele existente din proiect:
              Trimitem căutarea, categoria ȘI funcția setCartCount ca să putem adăuga în coș din pagină
            */}
            <Route 
              path="/produse" 
              element={
                <Produse 
                  searchQuery={searchQuery} 
                  selectedCategory={selectedCategory} 
                  setCartCount={setCartCount} 
                />
              } 
            />
            
            <Route 
              path="/" 
              element={
                <Produse 
                  searchQuery={searchQuery} 
                  selectedCategory={selectedCategory} 
                  setCartCount={setCartCount} 
                />
              } 
            />
            
            {/* Tot aici vor adăuga și ceilalți colegi rutele lor ulterior (ex: /despre, /contact) */}
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;