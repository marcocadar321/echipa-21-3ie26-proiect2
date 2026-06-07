import React, { useState, useEffect, useRef } from 'react';
import { useCart } from "../../context/CartContext";

// ── Icons ──────────────────────────────────────────────────────────────────────
const IcoClose = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IcoArrow = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const IcoPlus = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
);
const IcoMinus = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /></svg>
);
const IcoCheck = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
);
const IcoBack = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
);
const IcoSuccess = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="8 12 11 15 16 9" />
  </svg>
);

// ── Validator ──────────────────────────────────────────────────────────────────
const validate = (form, metodaLivrare) => {
  const errs = {};
  if (!form.nume.trim()) errs.nume = 'Numele este obligatoriu';
  if (!form.telefon.trim()) errs.telefon = 'Telefonul este obligatoriu';
  else if (!/^(\+4)?07\d{8}$/.test(form.telefon.replace(/\s/g, ''))) errs.telefon = 'Număr invalid (ex: 0712345678)';
  if (!form.email.trim()) errs.email = 'Email-ul este obligatoriu';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Email invalid';
  if (metodaLivrare !== 'ridicare') {
    if (!form.adresa.trim()) errs.adresa = 'Adresa este obligatorie';
    if (!form.oras.trim()) errs.oras = 'Orașul este obligatoriu';
    if (!form.judet.trim()) errs.judet = 'Județul este obligatoriu';
    if (!form.cod_postal.trim()) errs.cod_postal = 'Codul poștal este obligatoriu';
    else if (!/^\d{6}$/.test(form.cod_postal)) errs.cod_postal = 'Cod poștal invalid (6 cifre)';
  }
  if (!form.gdpr) errs.gdpr = 'Trebuie să accepți politica de confidențialitate';
  return errs;
};

// ── CSS ────────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  .drawer-root {
    --cream: #FAF8F4;
    --cream-dark: #F2EDE4;
    --ink: #1A1612;
    --ink-soft: #4A4540;
    --ink-muted: #8A8480;
    --rose: #C8516A;
    --rose-light: #F5E8EB;
    --rose-dark: #A03050;
    --gold: #B8935A;
    --border: rgba(26,22,18,0.1);
    --border-mid: rgba(26,22,18,0.18);
    --shadow-lg: 0 20px 60px rgba(26,22,18,0.18);
    --font-serif: 'Cormorant Garamond', Georgia, serif;
    --font-sans: 'Jost', system-ui, sans-serif;
    --radius: 2px;
    --radius-lg: 4px;
    --transition: 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  @media (prefers-color-scheme: dark) {
    .drawer-root {
      --cream: #131210;
      --cream-dark: #1C1A16;
      --ink: #F0EDE8;
      --ink-soft: #C8C4BC;
      --ink-muted: #7A7670;
      --border: rgba(240,237,232,0.1);
      --border-mid: rgba(240,237,232,0.18);
      --shadow-lg: 0 20px 60px rgba(0,0,0,0.4);
      --rose-light: rgba(200,81,106,0.12);
    }
  }

  /* ── Backdrop ── */
  .cd-backdrop {
    position: fixed; inset: 0;
    background: rgba(10,8,5,0.45);
    backdrop-filter: blur(6px);
    z-index: 40;
    animation: cdBackdropIn 0.25s ease;
  }
  @keyframes cdBackdropIn { from { opacity: 0 } to { opacity: 1 } }

  /* ── Panel ── */
  .cd-panel {
    position: fixed;
    top: 0; right: 0; bottom: 0;
    width: 100%; max-width: 480px;
    background: var(--cream);
    z-index: 50;
    display: flex; flex-direction: column;
    border-left: 1px solid var(--border);
    box-shadow: var(--shadow-lg);
    transform: translateX(100%);
    transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
    font-family: var(--font-sans);
    color: var(--ink);
  }
  .cd-panel.open { transform: translateX(0); }

  /* ── Header ── */
  .cd-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 22px 24px;
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }
  .cd-header-left { display: flex; align-items: baseline; gap: 10px; }
  .cd-title {
    font-family: var(--font-serif);
    font-size: 22px; font-weight: 300;
    color: var(--ink); margin: 0;
    letter-spacing: 0.01em;
  }
  .cd-subtitle {
    font-size: 10px; font-weight: 500;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--ink-muted);
  }
  .cd-close {
    width: 34px; height: 34px;
    border-radius: 50%;
    background: var(--cream-dark);
    border: 1px solid var(--border);
    color: var(--ink-soft);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
    flex-shrink: 0;
  }
  .cd-close:hover { background: var(--ink); color: var(--cream); }

  /* ── Stepper ── */
  .cd-stepper {
    display: flex; align-items: center;
    padding: 14px 24px;
    border-bottom: 1px solid var(--border);
    gap: 0;
    flex-shrink: 0;
  }
  .cd-step {
    display: flex; align-items: center; gap: 7px;
    font-size: 9px; font-weight: 600;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--ink-muted);
    position: relative;
  }
  .cd-step.active { color: var(--rose); }
  .cd-step.done { color: var(--ink-soft); }
  .cd-step-num {
    width: 22px; height: 22px;
    border-radius: 50%;
    border: 1px solid currentColor;
    display: flex; align-items: center; justify-content: center;
    font-size: 9px; font-weight: 600;
    flex-shrink: 0;
    transition: all 0.3s;
  }
  .cd-step.active .cd-step-num { background: var(--rose); border-color: var(--rose); color: white; }
  .cd-step.done .cd-step-num { background: var(--ink-soft); border-color: var(--ink-soft); color: var(--cream); }
  .cd-step-line {
    flex: 1; height: 1px;
    background: var(--border-mid);
    margin: 0 10px;
  }
  .cd-step-line.done { background: var(--ink-soft); }

  /* ── Body ── */
  .cd-body {
    flex: 1;
    overflow-y: auto;
    padding: 20px 24px;
    display: flex; flex-direction: column; gap: 12px;
  }
  .cd-body::-webkit-scrollbar { width: 4px; }
  .cd-body::-webkit-scrollbar-track { background: transparent; }
  .cd-body::-webkit-scrollbar-thumb { background: var(--border-mid); border-radius: 2px; }

  /* ── Empty ── */
  .cd-empty {
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    height: 100%; text-align: center; gap: 10px;
    padding: 40px 0;
  }
  .cd-empty-icon { font-size: 44px; opacity: 0.35; }
  .cd-empty-title {
    font-family: var(--font-serif);
    font-size: 20px; font-weight: 300;
    color: var(--ink-soft); margin: 0;
  }
  .cd-empty-sub { font-size: 11px; color: var(--ink-muted); letter-spacing: 0.08em; margin: 0; }

  /* ── Cart Item ── */
  .cd-item {
    display: flex; gap: 13px; align-items: center;
    background: var(--cream-dark);
    border: 1px solid var(--border);
    padding: 11px 13px;
    border-radius: var(--radius-lg);
    transition: border-color 0.2s;
  }
  .cd-item:hover { border-color: var(--border-mid); }
  .cd-item-img {
    width: 54px; height: 54px;
    object-fit: cover; flex-shrink: 0;
    border-radius: var(--radius);
  }
  .cd-item-info { flex: 1; min-width: 0; }
  .cd-item-name {
    font-size: 13px; font-weight: 400; color: var(--ink);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    margin: 0 0 3px;
  }
  .cd-item-cat {
    font-size: 9px; font-weight: 600; letter-spacing: 0.15em;
    text-transform: uppercase; color: var(--rose); margin: 0 0 6px;
  }
  .cd-qty-ctrl {
    display: flex; align-items: center; gap: 0;
    border: 1px solid var(--border-mid);
    border-radius: var(--radius);
    overflow: hidden;
    width: fit-content;
  }
  .cd-qty-btn {
    width: 26px; height: 24px;
    background: none; border: none;
    color: var(--ink-soft); cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s, color 0.15s;
  }
  .cd-qty-btn:hover { background: var(--ink); color: var(--cream); }
  .cd-qty-val {
    width: 28px; height: 24px;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 500; color: var(--ink);
    border-left: 1px solid var(--border-mid);
    border-right: 1px solid var(--border-mid);
  }
  .cd-item-right {
    display: flex; flex-direction: column;
    align-items: flex-end; gap: 4px; flex-shrink: 0;
  }
  .cd-item-total { font-size: 13px; font-weight: 500; color: var(--ink); }
  .cd-item-remove {
    background: none; border: none;
    font-family: var(--font-sans); font-size: 9px; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--ink-muted); cursor: pointer;
    transition: color 0.2s; padding: 0;
  }
  .cd-item-remove:hover { color: var(--rose); }

  /* ── Footer coș ── */
  .cd-footer {
    padding: 18px 24px;
    border-top: 1px solid var(--border);
    background: var(--cream);
    flex-shrink: 0;
    display: flex; flex-direction: column; gap: 10px;
  }
  .cd-total-row {
    display: flex; align-items: baseline; justify-content: space-between;
  }
  .cd-total-label { font-size: 10px; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: var(--ink-muted); }
  .cd-total-val { font-family: var(--font-serif); font-size: 26px; font-weight: 300; color: var(--ink); }

  .cd-btn-primary {
    width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px;
    background: var(--ink); color: var(--cream); border: none; padding: 14px;
    font-family: var(--font-sans); font-size: 10px; font-weight: 500;
    letter-spacing: 0.18em; text-transform: uppercase;
    cursor: pointer; transition: background var(--transition), transform 0.2s;
    border-radius: var(--radius);
  }
  .cd-btn-primary:hover { background: var(--rose-dark); transform: translateY(-1px); }
  .cd-btn-primary:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }

  .cd-btn-secondary {
    background: none; border: 1px solid var(--border-mid);
    width: 100%;
    font-family: var(--font-sans); font-size: 9px; font-weight: 500;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--ink-muted); cursor: pointer;
    transition: color 0.2s, border-color 0.2s; padding: 10px 0;
    border-radius: var(--radius);
  }
  .cd-btn-secondary:hover { color: var(--rose); border-color: var(--rose); }

  /* ── Formular comandă ── */
  .cd-form { display: flex; flex-direction: column; gap: 0; }

  .cd-section-label {
    font-size: 9px; font-weight: 600; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--rose);
    margin: 18px 0 10px;
    display: flex; align-items: center; gap: 8px;
  }
  .cd-section-label::after {
    content: ''; flex: 1; height: 1px;
    background: var(--border);
  }

  .cd-field { display: flex; flex-direction: column; gap: 5px; margin-bottom: 12px; }
  .cd-label { font-size: 10px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-soft); }
  .cd-input {
    background: var(--cream-dark); border: 1px solid var(--border);
    color: var(--ink); font-family: var(--font-sans);
    font-size: 13px; font-weight: 300;
    padding: 10px 13px; outline: none;
    transition: border-color 0.2s;
    border-radius: var(--radius);
    width: 100%;
    box-sizing: border-box;
  }
  .cd-input:focus { border-color: var(--ink-soft); }
  .cd-input.error { border-color: var(--rose); }
  .cd-input::placeholder { color: var(--ink-muted); }
  .cd-error-msg { font-size: 10px; color: var(--rose); letter-spacing: 0.05em; }

  .cd-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

  /* ── Opțiuni radio stilizate ── */
  .cd-options { display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px; }
  .cd-option {
    display: flex; align-items: flex-start; gap: 12px;
    background: var(--cream-dark); border: 1px solid var(--border);
    padding: 13px 14px; cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
    border-radius: var(--radius-lg);
  }
  .cd-option:hover { border-color: var(--border-mid); }
  .cd-option.selected { border-color: var(--ink-soft); background: var(--cream); }
  .cd-option-radio {
    width: 18px; height: 18px; border-radius: 50%;
    border: 1.5px solid var(--border-mid);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; margin-top: 1px;
    transition: border-color 0.2s, background 0.2s;
  }
  .cd-option.selected .cd-option-radio {
    border-color: var(--ink);
    background: var(--ink);
  }
  .cd-option-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--cream);
    opacity: 0; transition: opacity 0.2s;
  }
  .cd-option.selected .cd-option-dot { opacity: 1; }
  .cd-option-body { flex: 1; }
  .cd-option-title { font-size: 13px; font-weight: 400; color: var(--ink); margin: 0 0 2px; }
  .cd-option-sub { font-size: 11px; color: var(--ink-muted); font-weight: 300; margin: 0; }
  .cd-option-badge {
    font-size: 9px; font-weight: 600; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--rose);
    background: var(--rose-light); padding: 3px 8px;
    border-radius: 2px; flex-shrink: 0; margin-top: 1px;
  }

  /* ── GDPR Checkbox ── */
  .cd-gdpr {
    display: flex; align-items: flex-start; gap: 12px;
    background: var(--cream-dark); border: 1px solid var(--border);
    padding: 14px; cursor: pointer;
    border-radius: var(--radius-lg);
    margin-top: 4px;
    transition: border-color 0.2s;
  }
  .cd-gdpr.error { border-color: var(--rose); }
  .cd-gdpr-box {
    width: 18px; height: 18px;
    border: 1.5px solid var(--border-mid);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; margin-top: 1px;
    transition: border-color 0.2s, background 0.2s;
    border-radius: 2px;
  }
  .cd-gdpr.checked .cd-gdpr-box { border-color: var(--ink); background: var(--ink); }
  .cd-gdpr-text { font-size: 11px; color: var(--ink-soft); line-height: 1.6; font-weight: 300; }
  .cd-gdpr-link { color: var(--rose); text-decoration: underline; text-underline-offset: 3px; }

  /* ── Sumar comandă ── */
  .cd-summary {
    background: var(--cream-dark); border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden; margin-bottom: 12px;
  }
  .cd-summary-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 14px;
    border-bottom: 1px solid var(--border);
    font-size: 12px;
  }
  .cd-summary-row:last-child { border-bottom: none; }
  .cd-summary-key { color: var(--ink-muted); font-weight: 300; }
  .cd-summary-val { color: var(--ink); font-weight: 400; }
  .cd-summary-row.total .cd-summary-key { font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-soft); }
  .cd-summary-row.total .cd-summary-val { font-family: var(--font-serif); font-size: 20px; font-weight: 300; color: var(--ink); }

  /* ── Success screen ── */
  .cd-success {
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    height: 100%; text-align: center; gap: 16px;
    padding: 40px 24px;
  }
  .cd-success-icon { color: var(--rose); }
  .cd-success-title {
    font-family: var(--font-serif); font-size: 30px; font-weight: 300;
    color: var(--ink); margin: 0; line-height: 1.1;
  }
  .cd-success-sub { font-size: 13px; color: var(--ink-muted); line-height: 1.7; margin: 0; font-weight: 300; max-width: 280px; }
  .cd-success-order {
    background: var(--cream-dark); border: 1px solid var(--border);
    padding: 12px 20px; text-align: center;
    border-radius: var(--radius-lg);
  }
  .cd-success-order-label { font-size: 9px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-muted); margin-bottom: 4px; }
  .cd-success-order-num { font-family: var(--font-serif); font-size: 22px; font-weight: 300; color: var(--rose); }

  /* ── Livrare: câmpuri suplimentare ── */
  .cd-addr-fields { animation: cdFadeIn 0.3s ease; }
  @keyframes cdFadeIn { from { opacity: 0; transform: translateY(-6px) } to { opacity: 1; transform: translateY(0) } }

  /* ── Back button ── */
  .cd-back-btn {
    display: inline-flex; align-items: center; gap: 6px;
    background: none; border: none;
    font-family: var(--font-sans); font-size: 10px; font-weight: 500;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--ink-muted); cursor: pointer;
    transition: color 0.2s; padding: 0;
    margin-bottom: 4px;
  }
  .cd-back-btn:hover { color: var(--ink); }

  /* ── Scrollbar ── */
  .cd-body { scrollbar-width: thin; scrollbar-color: var(--border-mid) transparent; }
`;

// ── CartDrawer ─────────────────────────────────────────────────────────────────
export default function CartDrawer() {
  const { items, removeItem, updateQty, clearCart, totalVal, cosOpen, setCosOpen } = useCart();

  // step: 'cart' | 'checkout' | 'confirm' | 'success'
  const [step, setStep] = useState('cart');

  const [metodaPlata, setMetodaPlata] = useState('ramburs');
  const [metodaLivrare, setMetodaLivrare] = useState('curier');

  const [form, setForm] = useState({
    nume: '', telefon: '', email: '',
    adresa: '', bloc: '', oras: '', judet: '', cod_postal: '',
    mesaj: '', gdpr: false,
  });
  const [erori, setErori] = useState({});
  const [orderNum] = useState(() => `MF-${Date.now().toString(36).toUpperCase().slice(-6)}`);

  // Închide la Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setCosOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [setCosOpen]);

  // Blochează scroll body când e deschis
  useEffect(() => {
    document.body.style.overflow = cosOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [cosOpen]);

  // Reset la închidere
  useEffect(() => {
    if (!cosOpen) {
      setTimeout(() => {
        if (step !== 'success') setStep('cart');
        setErori({});
      }, 400);
    }
  }, [cosOpen]);

  const handleField = (field, val) => {
    setForm(f => ({ ...f, [field]: val }));
    if (erori[field]) setErori(e => ({ ...e, [field]: undefined }));
  };

  const pretLivrare = metodaLivrare === 'curier' ? 25 : metodaLivrare === 'posta' ? 15 : 0;
  const totalFinal = totalVal + pretLivrare;

  const handleCheckout = () => {
    const eroriNoi = validate(form, metodaLivrare);
    if (Object.keys(eroriNoi).length > 0) {
      setErori(eroriNoi);
      return;
    }
    setStep('confirm');
  };

  const handlePlaseaza = () => {
    setStep('success');
    clearCart();
  };

  // ── Render ──
  const stepIndex = { cart: 0, checkout: 1, confirm: 2, success: 3 };
  const stepCurrent = stepIndex[step] ?? 0;

  const STEPS = [
    { label: 'Coș' },
    { label: 'Date' },
    { label: 'Confirmare' },
  ];

  return (
    <div className="drawer-root">
      <style>{CSS}</style>

      {cosOpen && <div className="cd-backdrop" onClick={() => setCosOpen(false)} />}

      <div className={`cd-panel ${cosOpen ? 'open' : ''}`}>

        {/* Header */}
        <div className="cd-header">
          <div className="cd-header-left">
            <h2 className="cd-title">
              {step === 'cart' && 'Selecția Ta'}
              {step === 'checkout' && 'Date Comandă'}
              {step === 'confirm' && 'Confirmare'}
              {step === 'success' && 'Comandă Plasată'}
            </h2>
            {step === 'cart' && (
              <span className="cd-subtitle">
                {items.length} {items.length === 1 ? 'aranjament' : 'aranjamente'}
              </span>
            )}
          </div>
          <button className="cd-close" onClick={() => setCosOpen(false)}>
            <IcoClose />
          </button>
        </div>

        {/* Stepper — nu apare pe success */}
        {step !== 'success' && (
          <div className="cd-stepper">
            {STEPS.map((s, i) => (
              <React.Fragment key={s.label}>
                <div className={`cd-step ${i === stepCurrent ? 'active' : i < stepCurrent ? 'done' : ''}`}>
                  <span className="cd-step-num">
                    {i < stepCurrent ? <IcoCheck size={10} /> : i + 1}
                  </span>
                  <span>{s.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`cd-step-line ${i < stepCurrent ? 'done' : ''}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* ═══ STEP: COȘ ═══ */}
        {step === 'cart' && (
          <>
            <div className="cd-body">
              {items.length === 0 ? (
                <div className="cd-empty">
                  <div className="cd-empty-icon">💐</div>
                  <p className="cd-empty-title">Atelierul te așteaptă</p>
                  <p className="cd-empty-sub">Adaugă flori din colecție</p>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="cd-item">
                    <img
                      src={item.imagine}
                      alt={item.nume}
                      className="cd-item-img"
                      onError={e => { e.target.src = 'https://images.unsplash.com/photo-1490750967868-88df5691cc45?w=100&q=80'; }}
                    />
                    <div className="cd-item-info">
                      <p className="cd-item-name">{item.nume}</p>
                      <p className="cd-item-cat">{item.categorie}</p>
                      <div className="cd-qty-ctrl">
                        <button className="cd-qty-btn" onClick={() => updateQty(item.id, -1)}><IcoMinus /></button>
                        <span className="cd-qty-val">{item.qty}</span>
                        <button className="cd-qty-btn" onClick={() => updateQty(item.id, 1)}><IcoPlus /></button>
                      </div>
                    </div>
                    <div className="cd-item-right">
                      <span className="cd-item-total">{item.qty * item.pret} RON</span>
                      <button className="cd-item-remove" onClick={() => removeItem(item.id)}>Elimină</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="cd-footer">
                <div className="cd-total-row">
                  <span className="cd-total-label">Subtotal</span>
                  <span className="cd-total-val">{totalVal} RON</span>
                </div>
                <button className="cd-btn-primary" onClick={() => setStep('checkout')}>
                  Continuă comanda <IcoArrow />
                </button>
                <button className="cd-btn-secondary" onClick={clearCart}>Golește coșul</button>
              </div>
            )}
          </>
        )}

        {/* ═══ STEP: DATE COMANDĂ ═══ */}
        {step === 'checkout' && (
          <>
            <div className="cd-body">
              <button className="cd-back-btn" onClick={() => setStep('cart')}>
                <IcoBack /> Înapoi la coș
              </button>

              <div className="cd-form">

                {/* Date personale */}
                <div className="cd-section-label">Date personale</div>

                <div className="cd-field">
                  <label className="cd-label">Nume și prenume *</label>
                  <input
                    className={`cd-input ${erori.nume ? 'error' : ''}`}
                    placeholder="ex: Maria Ionescu"
                    value={form.nume}
                    onChange={e => handleField('nume', e.target.value)}
                  />
                  {erori.nume && <span className="cd-error-msg">{erori.nume}</span>}
                </div>

                <div className="cd-row">
                  <div className="cd-field">
                    <label className="cd-label">Telefon *</label>
                    <input
                      className={`cd-input ${erori.telefon ? 'error' : ''}`}
                      placeholder="07xxxxxxxx"
                      value={form.telefon}
                      onChange={e => handleField('telefon', e.target.value)}
                    />
                    {erori.telefon && <span className="cd-error-msg">{erori.telefon}</span>}
                  </div>
                  <div className="cd-field">
                    <label className="cd-label">Email *</label>
                    <input
                      className={`cd-input ${erori.email ? 'error' : ''}`}
                      placeholder="email@exemplu.ro"
                      value={form.email}
                      onChange={e => handleField('email', e.target.value)}
                    />
                    {erori.email && <span className="cd-error-msg">{erori.email}</span>}
                  </div>
                </div>

                {/* Metoda livrare */}
                <div className="cd-section-label">Metodă de livrare</div>

                <div className="cd-options">
                  {[
                    {
                      id: 'curier',
                      title: 'Curier rapid',
                      sub: 'Fan Courier · Livrare în 24–48h · Tracking inclus',
                      badge: '25 RON',
                    },
                    {
                      id: 'posta',
                      title: 'Poșta Română',
                      sub: 'Livrare în 3–7 zile lucrătoare · Tarif standard',
                      badge: '15 RON',
                    },
                  ].map(opt => (
                    <div
                      key={opt.id}
                      className={`cd-option ${metodaLivrare === opt.id ? 'selected' : ''}`}
                      onClick={() => setMetodaLivrare(opt.id)}
                    >
                      <span className="cd-option-radio">
                        <span className="cd-option-dot" />
                      </span>
                      <div className="cd-option-body">
                        <p className="cd-option-title">{opt.title}</p>
                        <p className="cd-option-sub">{opt.sub}</p>
                      </div>
                      <span className="cd-option-badge">{opt.badge}</span>
                    </div>
                  ))}
                </div>

                {/* Adresă livrare */}
                <div className="cd-addr-fields">
                  <div className="cd-section-label">Adresa de livrare</div>

                  <div className="cd-field">
                    <label className="cd-label">Stradă și număr *</label>
                    <input
                      className={`cd-input ${erori.adresa ? 'error' : ''}`}
                      placeholder="ex: Str. Florilor nr. 12"
                      value={form.adresa}
                      onChange={e => handleField('adresa', e.target.value)}
                    />
                    {erori.adresa && <span className="cd-error-msg">{erori.adresa}</span>}
                  </div>

                  <div className="cd-field">
                    <label className="cd-label">Bloc / Scară / Apartament (opțional)</label>
                    <input
                      className="cd-input"
                      placeholder="ex: Bl. A1, Sc. 2, Ap. 34"
                      value={form.bloc}
                      onChange={e => handleField('bloc', e.target.value)}
                    />
                  </div>

                  <div className="cd-row">
                    <div className="cd-field">
                      <label className="cd-label">Oraș *</label>
                      <input
                        className={`cd-input ${erori.oras ? 'error' : ''}`}
                        placeholder="ex: Timișoara"
                        value={form.oras}
                        onChange={e => handleField('oras', e.target.value)}
                      />
                      {erori.oras && <span className="cd-error-msg">{erori.oras}</span>}
                    </div>
                    <div className="cd-field">
                      <label className="cd-label">Județ *</label>
                      <input
                        className={`cd-input ${erori.judet ? 'error' : ''}`}
                        placeholder="ex: Timiș"
                        value={form.judet}
                        onChange={e => handleField('judet', e.target.value)}
                      />
                      {erori.judet && <span className="cd-error-msg">{erori.judet}</span>}
                    </div>
                  </div>

                  <div className="cd-field">
                    <label className="cd-label">Cod poștal *</label>
                    <input
                      className={`cd-input ${erori.cod_postal ? 'error' : ''}`}
                      placeholder="ex: 300001"
                      value={form.cod_postal}
                      onChange={e => handleField('cod_postal', e.target.value)}
                    />
                    {erori.cod_postal && <span className="cd-error-msg">{erori.cod_postal}</span>}
                  </div>
                </div>

                {/* Metodă plată */}
                <div className="cd-section-label">Metodă de plată</div>

                <div className="cd-options">
                  {[
                    {
                      id: 'ramburs',
                      title: 'Ramburs la livrare',
                      sub: 'Plătești cash direct curierului la primirea coletului',
                      badge: 'Popular',
                    },
                    {
                      id: 'transfer',
                      title: 'Transfer bancar',
                      sub: 'Datele contului bancar îți vor fi trimise pe email',
                      badge: 'Gratuit',
                    },
                  ].map(opt => (
                    <div
                      key={opt.id}
                      className={`cd-option ${metodaPlata === opt.id ? 'selected' : ''}`}
                      onClick={() => setMetodaPlata(opt.id)}
                    >
                      <span className="cd-option-radio">
                        <span className="cd-option-dot" />
                      </span>
                      <div className="cd-option-body">
                        <p className="cd-option-title">{opt.title}</p>
                        <p className="cd-option-sub">{opt.sub}</p>
                      </div>
                      <span className="cd-option-badge">{opt.badge}</span>
                    </div>
                  ))}
                </div>

                {/* Mesaj opțional */}
                <div className="cd-section-label">Mesaj pentru florist (opțional)</div>

                <div className="cd-field">
                  <textarea
                    className="cd-input"
                    placeholder="Preferințe de culori, ocazie specială, mesaj pe card..."
                    rows={3}
                    value={form.mesaj}
                    onChange={e => handleField('mesaj', e.target.value)}
                    style={{ resize: 'vertical', minHeight: '72px' }}
                  />
                </div>

                {/* GDPR */}
                <div className="cd-section-label">Confidențialitate</div>

                <div
                  className={`cd-gdpr ${form.gdpr ? 'checked' : ''} ${erori.gdpr ? 'error' : ''}`}
                  onClick={() => handleField('gdpr', !form.gdpr)}
                >
                  <span className="cd-gdpr-box">
                    {form.gdpr && <IcoCheck size={11} />}
                  </span>
                  <p className="cd-gdpr-text">
                    Am citit și accept{' '}
                    <a href="/politica-confidentialitate" className="cd-gdpr-link" onClick={e => e.stopPropagation()} target="_blank" rel="noreferrer">
                      Politica de Confidențialitate
                    </a>
                    {' '}și{' '}
                    <a href="/termeni-conditii" className="cd-gdpr-link" onClick={e => e.stopPropagation()} target="_blank" rel="noreferrer">
                      Termenii și Condițiile
                    </a>
                    . Sunt de acord cu prelucrarea datelor personale în scopul procesării comenzii. *
                  </p>
                </div>
                {erori.gdpr && (
                  <span className="cd-error-msg" style={{ marginTop: '4px', display: 'block' }}>{erori.gdpr}</span>
                )}

              </div>
            </div>

            <div className="cd-footer">
              <div className="cd-total-row">
                <span className="cd-total-label">Total estimat</span>
                <span className="cd-total-val">{totalFinal} RON</span>
              </div>
              <button className="cd-btn-primary" onClick={handleCheckout}>
                Verifică comanda <IcoArrow />
              </button>
            </div>
          </>
        )}

        {/* ═══ STEP: CONFIRMARE ═══ */}
        {step === 'confirm' && (
          <>
            <div className="cd-body">
              <button className="cd-back-btn" onClick={() => setStep('checkout')}>
                <IcoBack /> Modifică datele
              </button>

              <div className="cd-section-label">Produse comandate</div>
              <div className="cd-summary" style={{ marginBottom: '16px' }}>
                {items.map(item => (
                  <div key={item.id} className="cd-summary-row">
                    <span className="cd-summary-key">{item.nume} × {item.qty}</span>
                    <span className="cd-summary-val">{item.qty * item.pret} RON</span>
                  </div>
                ))}
              </div>

              <div className="cd-section-label">Detalii comandă</div>
              <div className="cd-summary">
                <div className="cd-summary-row">
                  <span className="cd-summary-key">Destinatar</span>
                  <span className="cd-summary-val">{form.nume}</span>
                </div>
                <div className="cd-summary-row">
                  <span className="cd-summary-key">Telefon</span>
                  <span className="cd-summary-val">{form.telefon}</span>
                </div>
                <div className="cd-summary-row">
                  <span className="cd-summary-key">Email</span>
                  <span className="cd-summary-val">{form.email}</span>
                </div>
                <div className="cd-summary-row">
                  <span className="cd-summary-key">Adresă</span>
                  <span className="cd-summary-val" style={{ textAlign: 'right', maxWidth: '200px' }}>
                    {form.adresa}{form.bloc ? `, ${form.bloc}` : ''}, {form.oras}, jud. {form.judet}, {form.cod_postal}
                  </span>
                </div>
                <div className="cd-summary-row">
                  <span className="cd-summary-key">Livrare</span>
                  <span className="cd-summary-val">
                    {metodaLivrare === 'curier' ? 'Curier rapid' : 'Poșta Română'} — {pretLivrare} RON
                  </span>
                </div>
                <div className="cd-summary-row">
                  <span className="cd-summary-key">Plată</span>
                  <span className="cd-summary-val">
                    {metodaPlata === 'ramburs' ? 'Ramburs la livrare' : 'Transfer bancar'}
                  </span>
                </div>
                {form.mesaj && (
                  <div className="cd-summary-row">
                    <span className="cd-summary-key">Mesaj</span>
                    <span className="cd-summary-val" style={{ textAlign: 'right', maxWidth: '200px', fontStyle: 'italic' }}>{form.mesaj}</span>
                  </div>
                )}
                <div className="cd-summary-row total">
                  <span className="cd-summary-key">Total de plată</span>
                  <span className="cd-summary-val">{totalFinal} RON</span>
                </div>
              </div>

              {metodaPlata === 'transfer' && (
                <div style={{
                  background: 'var(--rose-light)', border: '1px solid rgba(200,81,106,0.2)',
                  borderRadius: 'var(--radius-lg)', padding: '14px 16px',
                  fontSize: '12px', color: 'var(--ink-soft)', lineHeight: '1.6'
                }}>
                  <strong style={{ color: 'var(--rose-dark)', display: 'block', marginBottom: '4px', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Instrucțiuni transfer</strong>
                  După plasarea comenzii vei primi pe email detaliile contului bancar. Comanda se procesează în maxim 24h de la confirmarea plății.
                </div>
              )}
            </div>

            <div className="cd-footer">
              <button className="cd-btn-primary" onClick={handlePlaseaza}>
                ✦ Plasează comanda — {totalFinal} RON
              </button>
              <button className="cd-btn-secondary" onClick={() => setStep('checkout')}>
                Modifică datele
              </button>
            </div>
          </>
        )}

        {/* ═══ STEP: SUCCESS ═══ */}
        {step === 'success' && (
          <>
            <div className="cd-body">
              <div className="cd-success">
                <div className="cd-success-icon"><IcoSuccess /></div>
                <h2 className="cd-success-title">Mulțumim, {form.nume.split(' ')[0]}!</h2>
                <p className="cd-success-sub">
                  Comanda ta a fost înregistrată cu succes. Vei primi un email de confirmare la <strong>{form.email}</strong>.
                </p>
                <div className="cd-success-order">
                  <p className="cd-success-order-label">Număr comandă</p>
                  <p className="cd-success-order-num">{orderNum}</p>
                </div>
                <p className="cd-success-sub" style={{ marginTop: '8px' }}>
                  {metodaPlata === 'transfer'
                    ? 'Datele pentru transfer bancar au fost trimise pe email. Comanda se procesează după confirmarea plății.'
                    : 'Vei fi contactat de curier pentru programarea livrării.'}
                </p>
              </div>
            </div>
            <div className="cd-footer">
              <button className="cd-btn-primary" onClick={() => { setCosOpen(false); setStep('cart'); setForm({ nume: '', telefon: '', email: '', adresa: '', bloc: '', oras: '', judet: '', cod_postal: '', mesaj: '', gdpr: false }); }}>
                Închide
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
