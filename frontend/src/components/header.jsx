import React, { useState } from 'react';
import { Sun, Moon, Menu, X, Search } from 'lucide-react';

export default function Header({ darkMode, setDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur transition-colors duration-300 dark:bg-zinc-900/90 border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-pink-600 dark:text-pink-400 font-serif">
            🌸 Magnolia Shop
          </span>
        </div>

        {/* Desktop Navigation - Meniu Desktop Sticky */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-300">
          <a href="/" className="hover:text-pink-600 transition-colors">Acasă</a>
          <a href="/produse" className="text-pink-600 dark:text-pink-400 font-semibold border-b-2 border-pink-500">Produse</a>
          <a href="/despre" className="hover:text-pink-600 transition-colors">Despre Noi</a>
          <a href="/contact" className="hover:text-pink-600 transition-colors">Contact</a>
        </nav>

        {/* Utilitare (Search, Dark Mode, Hamburger) */}
        <div className="flex items-center gap-4">
          {/* Bara de căutare (Element tipic) */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400" />
            <input
              type="search"
              placeholder="Caută flori..."
              className="h-9 w-40 rounded-full bg-zinc-100 pl-8 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-zinc-800 dark:text-zinc-200"
            />
          </div>

          {/* Buton Light/Dark Schimbare Temă */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-zinc-600" />}
          </button>

          {/* Meniu Mobil - Buton Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md md:hidden hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Meniu Mobil - Afișare Offcanvas/Dropdown */}
      {isOpen && (
        <div className="md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-4 space-y-3 transition-all">
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