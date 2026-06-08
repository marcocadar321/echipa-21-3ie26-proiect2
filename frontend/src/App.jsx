import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ContactPage from './pages/ContactPage';


import { CartProvider } from './context/CartContext';
import Navbar from './Navbar';
import CartDrawer from './components/layout/CartDrawer';
import CookieBanner from './components/layout/CookieBanner';

import Footer from './components/layout/Footer';

import HomePage from './pages/HomePage';
import Meniu from './Meniu';
import PoliticaConfidentialitate from './pages/PoliticaConfidentialitate';
import TermeniConditii from './pages/TermeniConditii';
import AboutPage from './pages/AboutPage';


function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router>
<CartProvider>
  <div className="App min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-200">

    <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/meniu" element={<Meniu />} />
      <Route path="/aranjamente" element={<Meniu />} />
      <Route path="/contact" element={<ContactPage />} />

      <Route path="/politica-confidentialitate" element={<PoliticaConfidentialitate />} />
      <Route path="/termeni-conditii" element={<TermeniConditii />} />
      <Route path="/despre-noi" element={<AboutPage />} />
    </Routes>

    <CartDrawer />
    <CookieBanner />

  </div>
</CartProvider>
    </Router>
  );
}

export default App;