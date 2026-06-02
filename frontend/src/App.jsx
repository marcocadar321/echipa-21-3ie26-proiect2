import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Navbar'; 
import Produse from './produse'; 
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
          {/* Pagina ta originală de Home este afișată DOAR pe ruta principală */}
          <Route path="/" element={<Home />} />

          {/* Pagina de produse (Meniul de flori) este complet separată */}
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