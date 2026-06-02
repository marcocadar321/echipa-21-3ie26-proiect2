import React, { useState } from 'react';

import { Sun, Moon, Menu, X, Search, ShoppingBag } from 'lucide-react';
export default function Header({ 
  darkMode, 
  setDarkMode, 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory,
  cartCount // Primim variabila din App.jsx
}) {
  const [isOpen, setIsOpen] = useState(false);
  const categorii = ['Toate', 'Buchete', 'Flori Criogenate', 'Plante'];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur transition-colors duration-300 dark:bg-zinc-900/90 border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-pink-600 dark:text-pink-400 font-serif">
            🌸 Magnolia Shop
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-300">
          <a href="/" className="hover:text-pink-600 transition-colors">Acasă</a>
          <a href="/produse" className="text-pink-600 dark:text-pink-400 font-semibold border-b-2 border-pink-500">Produse</a>
          <a href="/despre" className="hover:text-pink-600 transition-colors">Despre Noi</a>
          <a href="/contact" className="hover:text-pink-600 transition-colors">Contact</a>
        </nav>

        {/* Utilitare */}
        <div className="flex items-center gap-4">
          
          {/* Bara de căutare */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400" />
            <input
              type="search"
              placeholder="Caută flori..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-44 rounded-full bg-zinc-100 pl-8 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-zinc-800 dark:text-zinc-200 transition-colors"
            />
          </div>

          {/* ICONIȚĂ COȘ DE CUMPĂRĂTURI DINAMICĂ */}
          <div className="relative p-2 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors cursor-pointer">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </div>

          {/* Buton Light/Dark */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-zinc-600" />}
          </button>

          {/* Meniu Mobil */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md md:hidden hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 cursor-pointer"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Secțiunea de butoane pentru categorii */}
      <div className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 py-3 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 flex justify-center gap-2 overflow-x-auto">
          {categorii.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-pink-600 text-white shadow-xs dark:bg-pink-500'
                  : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-slate-100 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700 dark:hover:bg-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Meniu Mobil */}
      {isOpen && (
        <div className="md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-4 space-y-3 transition-all">
          <div className="relative w-full mb-2 sm:hidden">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400" />
            <input
              type="search"
              placeholder="Caută flori..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-full rounded-full bg-zinc-100 pl-8 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-zinc-800 dark:text-zinc-200"
            />
          </div>
          <nav className="flex flex-col gap-4 text-base font-medium text-zinc-600 dark:text-zinc-300">
            <a href="/" onClick={() => setIsOpen(false)} className="hover:text-pink-600">Acasă</a>
            <a href="/produse" onClick={() => setIsOpen(false)} className="text-pink-600 dark:text-pink-400 font-semibold">Produse</a>
            <a href="/despre" onClick={() => setIsOpen(false)} className="hover:text-pink-600">Despre Noi</a>
            <a href="/contact" onClick={() => setIsOpen(false)} className="hover:text-pink-600">Contact</a>
          </nav>
        </div>
      )}
    </header>
  );
}