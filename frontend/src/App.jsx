import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Navbar';
import CookieBanner from './components/layout/CookieBanner';

import HomePage from './pages/HomePage';
import Meniu from './Meniu';
import PoliticaConfidentialitate from './pages/PoliticaConfidentialitate';
import TermeniConditii from './pages/TermeniConditii';

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
      <div className="App min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-200">

        {/* Navbar vizibil pe toate paginile */}
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          cartCount={cartCount}
        />

        {/* Conținut pagini */}
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/meniu"
            element={
              <Meniu
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            }
          />

          <Route
            path="/aranjamente"
            element={
              <Meniu
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            }
          />

          {/* Pagini GDPR */}
          <Route path="/politica-confidentialitate" element={<PoliticaConfidentialitate />} />
          <Route path="/termeni-conditii" element={<TermeniConditii />} />
        </Routes>

        {/* Banner cookie GDPR — apare pe toate paginile */}
        <CookieBanner />

      </div>
    </Router>
  );
}

export default App;
