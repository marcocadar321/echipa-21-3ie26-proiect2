import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Navbar';
import Meniu from './Meniu';       // Pagina de meniu (Meniu.jsx)
import Produse from './Produse.jsx';   // Pagina de produse veche (Produse.jsx)
import Home from './Home';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toate');
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="App min-h-screen bg-[#fdf5f2] dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">

        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          cartCount={cartCount}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <Routes>
          {/* Pagina principală */}
          <Route path="/" element={<Home />} />

          {/* Pagina Meniu — corelată cu Strapi, coș propriu, categorii, filtre */}
          <Route
            path="/meniu"
            element={
              <Meniu setCartCount={setCartCount} />
            }
          />

          {/* Pagina Produse (varianta veche, păstrată dacă mai e nevoie) */}
          <Route
            path="/produse"
            element={
              <Produse
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                setCartCount={setCartCount}
              />
            }
          />
        </Routes>

      </div>
    </Router>
  );
}

export default App;