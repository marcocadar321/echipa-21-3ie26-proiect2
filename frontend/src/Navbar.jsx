import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { name: "Acasă", path: "/" },          // Corelat cu pagina ta Home
  { name: "Despre", path: "/despre" },
  { name: "Meniu", path: "/produse" },     // Corelat cu pagina ta de Produse din Strapi
  { name: "Contact", path: "/contact" },
];

const Navbar = ({ searchQuery, setSearchQuery, cartCount }) => {
  const location = useLocation();
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&family=Jost:wght@300;400;500&display=swap');

        .nav-root {
          position: sticky;
          top: 0;
          z-index: 50;
          width: 100%;
          background: linear-gradient(135deg, #fff8f9 0%, #fdf2f8 40%, #f0fdf4 100%);
          border-bottom: 1px solid rgba(236, 163, 179, 0.35);
          box-shadow: 0 2px 24px rgba(236,163,179,0.18), 0 1px 4px rgba(0,0,0,0.04);
          font-family: 'Jost', sans-serif;
          overflow: hidden;
        }

        .nav-blob-left {
          pointer-events: none;
          position: absolute;
          top: -40px; left: -40px;
          width: 180px; height: 180px;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(251,207,232,0.35) 0%, transparent 70%);
        }

        .nav-blob-right {
          pointer-events: none;
          position: absolute;
          top: -30px; right: 80px;
          width: 120px; height: 120px;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(167,243,208,0.28) 0%, transparent 70%);
        }

        .nav-inner {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 2.5rem;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.7rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-decoration: none;
          background: linear-gradient(135deg, #be185d 0%, #9d174d 50%, #166534 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          flex-shrink: 0;
        }

        .nav-logo-icon {
          font-size: 1.3rem;
          -webkit-text-fill-color: initial;
          filter: drop-shadow(0 1px 2px rgba(190,24,93,0.3));
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 18px;
          border-radius: 9999px;
          font-size: 0.82rem;
          font-weight: 400;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          color: #6b4a5e;
          transition: color 0.25s ease, background 0.25s ease;
          white-space: nowrap;
        }

        .nav-link:hover {
          color: #be185d;
          background: rgba(251, 207, 232, 0.25);
        }

        .nav-link.active {
          color: #be185d;
          font-weight: 500;
          background: linear-gradient(135deg, rgba(251,207,232,0.4), rgba(167,243,208,0.2));
        }

        .nav-dot {
          width: 4px;
          height: 4px;
          border-radius: 9999px;
          flex-shrink: 0;
          background: linear-gradient(135deg, #ec4899, #16a34a);
          opacity: 0;
          transition: opacity 0.25s ease;
        }

        .nav-link:hover .nav-dot,
        .nav-link.active .nav-dot {
          opacity: 1;
        }

        .nav-underline {
          position: absolute;
          bottom: 0;
          left: 18px;
          right: 18px;
          height: 1.5px;
          border-radius: 2px;
          background: linear-gradient(90deg, #be185d, #ec4899, #16a34a);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .nav-link:hover .nav-underline,
        .nav-link.active .nav-underline {
          transform: scaleX(1);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .nav-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 9999px;
          border: none;
          background: none;
          color: #9d6b8a;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
          position: relative;
        }

        .nav-icon-btn:hover {
          background: rgba(251, 207, 232, 0.4);
          color: #be185d;
          transform: scale(1.1);
        }

        /* Badge-ul de coș optimizat pentru cifre */
        .nav-badge-count {
          position: absolute;
          top: -2px; right: -2px;
          background: linear-gradient(135deg, #be185d, #ec4899);
          color: white;
          font-size: 0.65rem;
          font-weight: bold;
          min-width: 16px;
          height: 16px;
          padding: 0 4px;
          border-radius: 9999px;
          border: 1.5px solid #fff8f9;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-separator {
          width: 1px;
          height: 20px;
          margin: 0 4px;
          background: linear-gradient(to bottom, transparent, rgba(190,24,93,0.2), transparent);
        }

        .nav-cta {
          display: inline-flex;
          align-items: center;
          padding: 8px 20px;
          border-radius: 9999px;
          font-family: 'Jost', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          color: #ffffff;
          white-space: nowrap;
          background: linear-gradient(135deg, #be185d 0%, #9d174d 60%, #15803d 100%);
          box-shadow: 0 3px 12px rgba(190,24,93,0.28);
          transition: box-shadow 0.25s ease, transform 0.2s ease;
        }

        .nav-cta:hover {
          box-shadow: 0 5px 18px rgba(190,24,93,0.38);
          transform: translateY(-1px);
        }

        /* Bara de căutare input fluidă */
        .nav-search-input {
          border: 1px solid rgba(236, 163, 179, 0.5);
          background: white;
          padding: 6px 14px;
          border-radius: 9999px;
          font-size: 0.8rem;
          color: #6b4a5e;
          outline: none;
          width: 150px;
          transition: all 0.3s ease;
        }
        .nav-search-input:focus {
          border-color: #be185d;
          box-shadow: 0 0 8px rgba(190,24,93,0.15);
          width: 180px;
        }
      `}</style>

      <nav className="nav-root">
        <div className="nav-blob-left" />
        <div className="nav-blob-right" />

        <div className="nav-inner">

          {/* LOGO */}
          <Link to="/" className="nav-logo">
            <span className="nav-logo-icon">🌸</span>
            FLORI
          </Link>

          {/* LINK-URI */}
          <ul className="nav-links">
            {NAV_LINKS.map((item) => {
              // Verificăm activitatea rutei
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`nav-link${isActive ? ' active' : ''}`}
                  >
                    <span className="nav-dot" />
                    {item.name}
                    <span className="nav-underline" />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ACȚIUNI */}
          <div className="nav-actions">

            {/* Input Căutare Dinamic - Apare la click doar pe pagina de produse */}
            {location.pathname === '/produse' && showSearchInput && (
              <input
                type="text"
                placeholder="Caută o floare..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="nav-search-input"
                autoFocus
              />
            )}

            {/* Buton Căutare */}
            {location.pathname === '/produse' && (
              <button 
                className="nav-icon-btn" 
                aria-label="Căutare"
                onClick={() => setShowSearchInput(!showSearchInput)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                </svg>
              </button>
            )}

            {/* Coș de Cumpărături */}
            <button className="nav-icon-btn" aria-label="Coș de cumpărături">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {/* Afișează numărul real din coș dacă acesta este mai mare decât 0 */}
              {cartCount > 0 && (
                <span className="nav-badge-count">{cartCount}</span>
              )}
            </button>

            <div className="nav-separator" />

            {/* CTA */}
            <Link to="/comanda" className="nav-cta">
              Comandă
            </Link>

          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;