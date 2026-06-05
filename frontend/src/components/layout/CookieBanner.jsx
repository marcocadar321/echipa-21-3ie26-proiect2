import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CookieBanner() {
  const [vizibil, setVizibil] = useState(false);

  useEffect(() => {
    const consimtamant = localStorage.getItem('cookie-consimtamant');
    if (!consimtamant) setVizibil(true);
  }, []);

  const accepta = () => {
    localStorage.setItem('cookie-consimtamant', 'acceptat');
    setVizibil(false);
  };

  const refuza = () => {
    localStorage.setItem('cookie-consimtamant', 'refuzat');
    setVizibil(false);
  };

  if (!vizibil) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 48px)',
      maxWidth: '860px',
      background: '#1A1612',
      color: '#FAF8F4',
      borderRadius: '6px',
      border: '1px solid rgba(250,248,244,0.1)',
      boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
      padding: '20px 28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '24px',
      flexWrap: 'wrap',
      zIndex: 9999,
      fontFamily: "'Jost', system-ui, sans-serif",
      animation: 'cookieIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    }}>
      <style>{`
        @keyframes cookieIn {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>

      {/* Text */}
      <p style={{
        margin: 0,
        fontSize: '13px',
        fontWeight: '300',
        lineHeight: '1.65',
        color: 'rgba(250,248,244,0.75)',
        flex: 1,
        minWidth: '260px',
      }}>
        🍪 Folosim cookie-uri pentru a îmbunătăți experiența ta pe site. 
        Prin continuarea navigării, ești de acord cu{' '}
        <Link to="/politica-confidentialitate" style={{ color: '#C8516A', textDecoration: 'underline' }}>
          Politica de Confidențialitate
        </Link>{' '}și{' '}
        <Link to="/termeni-conditii" style={{ color: '#C8516A', textDecoration: 'underline' }}>
          Termenii și Condițiile
        </Link>.
      </p>

      {/* Butoane */}
      <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
        <button
          onClick={refuza}
          style={{
            padding: '10px 20px',
            background: 'transparent',
            border: '1px solid rgba(250,248,244,0.2)',
            color: 'rgba(250,248,244,0.6)',
            fontSize: '11px',
            fontWeight: '500',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            borderRadius: '3px',
            fontFamily: 'inherit',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => e.target.style.borderColor = 'rgba(250,248,244,0.5)'}
          onMouseLeave={e => e.target.style.borderColor = 'rgba(250,248,244,0.2)'}
        >
          Refuz
        </button>
        <button
          onClick={accepta}
          style={{
            padding: '10px 24px',
            background: '#C8516A',
            border: '1px solid #C8516A',
            color: 'white',
            fontSize: '11px',
            fontWeight: '500',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            borderRadius: '3px',
            fontFamily: 'inherit',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.target.style.background = '#A03050'}
          onMouseLeave={e => e.target.style.background = '#C8516A'}
        >
          Accept toate
        </button>
      </div>
    </div>
  );
}
