import React, { useState, useEffect, useRef } from 'react';
import Footer from './components/layout/Footer';
import { useCart } from './context/CartContext';

const STRAPI_URL = 'http://localhost:1337';

// ─── Icons ────────────────────────────────────────────────────────────────────
const IcoCart = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
);
const IcoHeart = ({ filled, size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const IcoClose = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IcoSearch = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IcoStar = ({ filled }) => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill={filled ? '#e8a87c' : 'none'} stroke="#e8a87c" strokeWidth="1.5">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
  </svg>
);
const IcoArrow = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const IcoChevron = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
);
const IcoBag = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);
const IcoQuote = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" opacity="0.15">
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
  </svg>
);

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getImageUrl = (item) => {
  const imgData = item?.Imagine ?? item?.imagine;
  if (!imgData) return null;
  const url = imgData?.formats?.medium?.url ?? imgData?.formats?.small?.url ?? imgData?.url ?? null;
  if (!url) return null;
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
};

const mapArticle = (item) => {
  const catRaw = item?.Categorii ?? item?.categorii;
  const catNume = catRaw?.Nume ?? catRaw?.nume ?? catRaw?.data?.attributes?.Nume ?? 'Altele';
  return {
    id: item.id,
    documentId: item.documentId ?? null,
    nume: item.Nume ?? item.nume ?? 'Produs fără nume',
    descriere: item.Descriere ?? item.descriere ?? 'O floare deosebită pentru momente speciale.',
    categorie: catNume,
    pret: item.Pret ?? item.pret ?? 0,
    pretVechi: item.PretVechi ?? item.pretVechi ?? null,
    stoc: item.stoc ?? item.Stoc ?? null,
    rating: item.rating ?? item.Rating ?? 4,
    imagine: getImageUrl(item) ?? 'https://images.unsplash.com/photo-1490750967868-88df5691cc45?w=800&q=80',
  };
};

const Stele = ({ rating = 4 }) => (
  <div style={{ display: 'flex', gap: '2px' }}>
    {[1,2,3,4,5].map(i => <IcoStar key={i} filled={i <= rating} />)}
  </div>
);

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const Skeleton = () => (
  <div className="skeleton-card">
    <div className="skeleton-img" />
    <div className="skeleton-body">
      <div className="skeleton-line short" />
      <div className="skeleton-line medium" />
      <div className="skeleton-line long" />
    </div>
  </div>
);

// ─── Badge Stoc ───────────────────────────────────────────────────────────────
const BadgeStoc = ({ stoc }) => {
  if (stoc === undefined || stoc === null) return null;
  if (stoc > 5) return null;
  const cfg = stoc <= 0
    ? { text: 'Epuizat', color: '#9ca3af', bg: 'rgba(156,163,175,0.15)' }
    : { text: `Ultimele ${stoc}`, color: '#b45309', bg: 'rgba(245,158,11,0.12)' };
  return (
    <span style={{
      position: 'absolute', top: '12px', left: '12px',
      background: cfg.bg, color: cfg.color,
      fontSize: '9px', fontWeight: '600', letterSpacing: '0.15em',
      textTransform: 'uppercase', padding: '4px 10px',
      backdropFilter: 'blur(8px)', border: `1px solid ${cfg.color}30`,
    }}>
      {cfg.text}
    </span>
  );
};

// ─── Card Produs ──────────────────────────────────────────────────────────────
const Card = ({ produs, onDetalii, onAdauga, favorit, onFavorit, index = 0 }) => {
  const [adaugat, setAdaugat] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleAdauga = (e) => {
    e.stopPropagation();
    if (produs.stoc === 0) return;
    setAdaugat(true);
    onAdauga(produs);
    setTimeout(() => setAdaugat(false), 2200);
  };

  const src = imgErr ? 'https://images.unsplash.com/photo-1490750967868-88df5691cc45?w=800&q=80' : produs.imagine;
  const discount = produs.pretVechi ? Math.round(100 - (produs.pret / produs.pretVechi) * 100) : null;

  return (
    <article
      className="product-card"
      style={{ animationDelay: `${index * 80}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="card-image-wrap" onClick={() => onDetalii(produs)}>
        <img
          src={src}
          alt={produs.nume}
          onError={() => setImgErr(true)}
          className={`card-img ${hovered ? 'hovered' : ''}`}
        />
        <div className={`card-overlay ${hovered ? 'visible' : ''}`} />
        <BadgeStoc stoc={produs.stoc} />
        {discount && <span className="badge-discount">−{discount}%</span>}
        <button
          className={`btn-fav ${favorit ? 'active' : ''}`}
          onClick={(e) => { e.stopPropagation(); onFavorit(produs.id); }}
          title="Adaugă la favorite"
        >
          <IcoHeart filled={favorit} size={13} />
        </button>
        <div className={`card-quick-view ${hovered ? 'visible' : ''}`}>
          <button className="btn-quick-view" onClick={() => onDetalii(produs)}>
            <IcoSearch /> <span>Detalii rapide</span>
          </button>
        </div>
      </div>

      <div className="card-body">
        <div className="card-meta">
          <span className="card-category">{produs.categorie}</span>
          <Stele rating={produs.rating} />
        </div>
        <h3 className="card-title" onClick={() => onDetalii(produs)}>{produs.nume}</h3>
        <p className="card-desc">{produs.descriere}</p>
        <div className="card-footer">
          <div className="card-price">
            <span className="price-main">{produs.pret} RON</span>
            {produs.pretVechi && <span className="price-old">{produs.pretVechi} RON</span>}
          </div>
          <button
            className={`btn-add ${adaugat ? 'added' : ''} ${produs.stoc === 0 ? 'disabled' : ''}`}
            onClick={handleAdauga}
            disabled={produs.stoc === 0}
          >
            {adaugat ? (
              <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Adăugat</>
            ) : (
              <><IcoCart size={12} /> Adaugă</>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

// ─── Modal ────────────────────────────────────────────────────────────────────
const Modal = ({ produs, onClose, onAdauga, favorit, onFavorit }) => {
  const backdropRef = useRef(null);
  const [imgErr, setImgErr] = useState(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  return (
    <div
      ref={backdropRef}
      className="modal-backdrop"
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
    >
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}><IcoClose size={13} /></button>
        <div className="modal-img-side">
          <img
            src={imgErr ? 'https://images.unsplash.com/photo-1490750967868-88df5691cc45?w=800&q=80' : produs.imagine}
            alt={produs.nume}
            onError={() => setImgErr(true)}
            className="modal-img"
          />
          <div className="modal-img-overlay" />
          <span className="modal-cat-badge">{produs.categorie}</span>
          <button
            className={`modal-fav-btn ${favorit ? 'active' : ''}`}
            onClick={() => onFavorit(produs.id)}
          >
            <IcoHeart filled={favorit} size={13} />
          </button>
        </div>
        <div className="modal-content-side">
          <div className="modal-rating-row">
            <Stele rating={produs.rating} />
            <span className="modal-review-count">24 recenzii</span>
          </div>
          <h2 className="modal-title">{produs.nume}</h2>
          <p className="modal-desc">{produs.descriere}</p>
          <div className="modal-features">
            {[
              ['🚀', 'Livrare VIP', 'Timișoara în 2h'],
              ['🌿', 'Prospețime', 'Garantată 7+ zile'],
              ['🎨', 'Design', 'Florist Premium'],
              ['📦', 'Ambalaj', 'Maison de Fleurs'],
            ].map(([ico, label, val]) => (
              <div key={label} className="modal-feature">
                <span className="feature-icon">{ico}</span>
                <div>
                  <div className="feature-label">{label}</div>
                  <div className="feature-value">{val}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="modal-price-row">
            <div>
              <span className="modal-price">{produs.pret} RON</span>
              {produs.pretVechi && <span className="modal-price-old">{produs.pretVechi} RON</span>}
            </div>
            {produs.pretVechi && (
              <span className="modal-discount-badge">
                −{Math.round(100 - (produs.pret / produs.pretVechi) * 100)}%
              </span>
            )}
          </div>
          <button
            className="btn-modal-add"
            onClick={() => { onAdauga(produs); onClose(); }}
            disabled={produs.stoc === 0}
          >
            <IcoBag />
            {produs.stoc === 0 ? 'Momentan epuizat' : 'Adaugă în selecție'}
            <IcoArrow />
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Reviews Section ──────────────────────────────────────────────────────────
const REVIEWS = [
  { id: 1, nume: 'Alexandra M.', rating: 5, data: '18 mai 2025', text: 'Am comandat un buchet pentru mama de ziua ei și a fost absolut superb! Florile erau proaspete, aranjamentul impecabil, iar livrarea a ajuns exact la timp. Cu siguranță voi mai comanda.', tag: 'Buchet aniversar', avatar: 'A' },
  { id: 2, nume: 'Radu P.', rating: 5, data: '3 iunie 2025', text: 'Calitate excepțională și ambalaj de lux. Am primit complimente de la toți invitații la eveniment. Echipa Maison de Fleurs a depășit orice așteptare.', tag: 'Aranjament eveniment', avatar: 'R' },
  { id: 3, nume: 'Ioana C.', rating: 4, data: '27 aprilie 2025', text: 'Florile au fost exact cum le-am văzut în poze – ba chiar mai frumoase în realitate. Livrarea a fost promptă și amabilă. Recomand cu toată inima.', tag: 'Trandafiri premium', avatar: 'I' },
  { id: 4, nume: 'Mihai T.', rating: 5, data: '11 mai 2025', text: 'Am surprins-o pe soția mea cu o cutie de trandafiri și reacția ei a spus totul. Florile s-au păstrat proaspete peste 10 zile. Serviciu ireproșabil!', tag: 'Cutie cu trandafiri', avatar: 'M' },
  { id: 5, nume: 'Elena D.', rating: 5, data: '2 iunie 2025', text: 'A treia comandă și de fiecare dată serviciul a fost la fel de bun. Florile sunt mereu proaspete, designul elegant, iar echipa super drăguță. Bravo!', tag: 'Client fidel', avatar: 'E' },
  { id: 6, nume: 'Cristian B.', rating: 4, data: '22 mai 2025', text: 'Prețuri corecte pentru calitatea oferită. Am primit un aranjament personalizat în mai puțin de 24h. Florile au arătat perfect la evenimentul nostru.', tag: 'Aranjament nuntă', avatar: 'C' },
];

const ReviewsSection = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const total = REVIEWS.length;
  const prev = () => setActiveIdx(i => (i - 1 + total) % total);
  const next = () => setActiveIdx(i => (i + 1) % total);
  const visible = [REVIEWS[activeIdx], REVIEWS[(activeIdx + 1) % total], REVIEWS[(activeIdx + 2) % total]];

  return (
    <section className="reviews-section">
      <div className="reviews-inner">
        <div className="reviews-header">
          <span className="reviews-eyebrow">✦ Recenzii Clienți ✦</span>
          <h2 className="reviews-title">Ce spun clienții noștri</h2>
          <p className="reviews-sub">Peste 500 de clienți mulțumiți în Timișoara și împrejurimi</p>
          <div className="reviews-aggregate">
            <div className="reviews-score">4.9</div>
            <div>
              <div style={{ display: 'flex', gap: '3px', marginBottom: '4px' }}>
                {[1,2,3,4,5].map(i => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#e8a87c" stroke="#e8a87c" strokeWidth="1.5">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                  </svg>
                ))}
              </div>
              <div className="reviews-count-label">bazat pe 500+ recenzii</div>
            </div>
          </div>
        </div>
        <div className="reviews-grid">
          {visible.map((rev, i) => (
            <div key={rev.id} className="review-card" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="review-quote-icon"><IcoQuote /></div>
              <div className="review-stars">
                {[1,2,3,4,5].map(s => (
                  <svg key={s} width="11" height="11" viewBox="0 0 24 24" fill={s <= rev.rating ? '#e8a87c' : 'none'} stroke="#e8a87c" strokeWidth="1.5">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                  </svg>
                ))}
              </div>
              <p className="review-text">"{rev.text}"</p>
              <div className="review-tag">{rev.tag}</div>
              <div className="review-author">
                <div className="review-avatar">{rev.avatar}</div>
                <div>
                  <div className="review-name">{rev.nume}</div>
                  <div className="review-date">{rev.data}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="reviews-nav">
          <button className="reviews-nav-btn" onClick={prev}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div className="reviews-dots">
            {REVIEWS.map((_, i) => (
              <button key={i} className={`reviews-dot ${i === activeIdx ? 'active' : ''}`} onClick={() => setActiveIdx(i)} />
            ))}
          </div>
          <button className="reviews-nav-btn" onClick={next}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Meniu() {
  const { addItem, totalQty, setCosOpen } = useCart();

  const [produse, setProduse] = useState([]);
  const [categorii, setCategorii] = useState(['Toate']);
  const [catActiva, setCatActiva] = useState('Toate');
  const [loading, setLoading] = useState(true);
  const [eroare, setEroare] = useState(null);
  const [search, setSearch] = useState('');
  const [sortare, setSortare] = useState('implicit');
  const [produsSelectat, setProdusSelectat] = useState(null);
  const [favorite, setFavorite] = useState(new Set());
  const [toast, setToast] = useState(null);
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef(null);

  useEffect(() => {
    fetch(`${STRAPI_URL}/api/produses?populate=Imagine&populate=categorii`)
      .then(r => { if (!r.ok) throw new Error(`Eroare server: ${r.status}`); return r.json(); })
      .then(json => {
        if (!json.data) throw new Error('Răspuns neidentificat');
        const mapped = json.data.map(mapArticle);
        setProduse(mapped);
        const cats = ['Toate', ...new Set(mapped.map(p => p.categorie).filter(Boolean))];
        setCategorii(cats);
        setLoading(false);
      })
      .catch(err => { setEroare(err.message); setLoading(false); });
  }, []);

  useEffect(() => {
    const handler = (e) => { if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtrate = produse
    .filter(p => {
      const catOk = catActiva === 'Toate' || p.categorie === catActiva;
      const q = search.toLowerCase();
      const searchOk = !q || p.nume.toLowerCase().includes(q) || p.descriere.toLowerCase().includes(q);
      return catOk && searchOk;
    })
    .sort((a, b) => {
      if (sortare === 'pret-asc') return a.pret - b.pret;
      if (sortare === 'pret-desc') return b.pret - a.pret;
      if (sortare === 'nume') return a.nume.localeCompare(b.nume, 'ro');
      return 0;
    });

  // Folosim addItem din CartContext
  const adaugaInCos = (produs) => {
    addItem(produs);
    setToast(produs.nume);
    setTimeout(() => setToast(null), 3000);
  };

  const toggleFavorit = (id) => setFavorite(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const sortOptions = [
    ['implicit', 'Recomandate'],
    ['pret-asc', 'Preț crescător'],
    ['pret-desc', 'Preț descrescător'],
    ['nume', 'Nume A–Z'],
  ];

  if (loading) return (
    <div className="meniu-root">
      <style>{CSS}</style>
      <div className="loading-grid">
        {[...Array(8)].map((_, i) => <Skeleton key={i} />)}
      </div>
    </div>
  );

  if (eroare) return (
    <div className="meniu-root">
      <style>{CSS}</style>
      <div className="error-state">
        <div className="error-icon">💐</div>
        <h3 className="error-title">Conexiune întreruptă</h3>
        <p className="error-msg">{eroare}</p>
        <div className="error-tips">
          <p>✦ Verificați dacă Strapi rulează la <strong>localhost:1337</strong></p>
          <p>✦ Asigurați-vă că permisiunile <strong>Public (find + findOne)</strong> sunt active.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="meniu-root">
      <style>{CSS}</style>

      {/* Toast */}
      {toast && (
        <div className="toast">
          <span className="toast-check">✓</span>
          <span className="toast-name">{toast}</span>
          <span className="toast-label">adăugat în coș</span>
        </div>
      )}

      {/* Hero */}
      <div className="hero">
        <div className="hero-inner">
          <span className="hero-eyebrow">✦ Maison de Fleurs ✦</span>
          <h1 className="hero-title">Colecția <em>Premium</em></h1>
          <p className="hero-sub">
            Flori de înaltă calitate, importate direct și aranjate de maeștri floriști.<br/>
            Livrare exclusivă în ambalaje speciale în maximum 2 ore.
          </p>
          <button className="btn-hero-cart" onClick={() => setCosOpen(true)}>
            <IcoCart size={14} />
            <span>Vizualizează selecția</span>
            {totalQty > 0 && <span className="hero-cart-badge">{totalQty}</span>}
          </button>
        </div>
        <div className="hero-divider">
          <svg viewBox="0 0 1200 40" preserveAspectRatio="none" style={{ width: '100%', height: '40px', display: 'block' }}>
            <path d="M0,20 Q300,0 600,20 T1200,20 L1200,40 L0,40 Z" fill="var(--cream)" />
          </svg>
        </div>
      </div>

      {/* Sticky Controls */}
      <div className="controls-bar">
        <div className="controls-inner">
          <div className="cat-list">
            {categorii.map(cat => (
              <button
                key={cat}
                className={`cat-btn ${catActiva === cat ? 'active' : ''}`}
                onClick={() => setCatActiva(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="controls-right">
            <div className="search-wrap">
              <span className="search-icon"><IcoSearch /></span>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Caută flori..."
                className="search-input"
              />
              {search && (
                <button className="search-clear" onClick={() => setSearch('')}><IcoClose size={12} /></button>
              )}
            </div>
            <div className="sort-wrap" ref={sortRef}>
              <button className="sort-btn" onClick={() => setSortOpen(o => !o)}>
                <span>{sortOptions.find(([v]) => v === sortare)?.[1]}</span>
                <IcoChevron />
              </button>
              {sortOpen && (
                <div className="sort-dropdown">
                  {sortOptions.map(([val, label]) => (
                    <button
                      key={val}
                      className={`sort-option ${sortare === val ? 'active' : ''}`}
                      onClick={() => { setSortare(val); setSortOpen(false); }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="content-area">
        {catActiva === 'Toate' && !search ? (
          <div className="sections-list">
            {categorii.filter(c => c !== 'Toate').map(cat => {
              const prodCat = filtrate.filter(p => p.categorie === cat);
              if (!prodCat.length) return null;
              return (
                <section key={cat} className="category-section">
                  <div className="section-header">
                    <div className="section-header-left">
                      <h2 className="section-title">{cat}</h2>
                      <span className="section-count">{prodCat.length} creații</span>
                    </div>
                    <button className="btn-see-all" onClick={() => setCatActiva(cat)}>
                      Vezi colecția <IcoArrow />
                    </button>
                  </div>
                  <div className="products-grid">
                    {prodCat.slice(0, 4).map((produs, i) => (
                      <Card
                        key={produs.id}
                        produs={produs}
                        index={i}
                        onDetalii={setProdusSelectat}
                        onAdauga={adaugaInCos}
                        favorit={favorite.has(produs.id)}
                        onFavorit={toggleFavorit}
                      />
                    ))}
                  </div>
                  {prodCat.length > 4 && (
                    <div className="load-more-wrap">
                      <button className="btn-load-more" onClick={() => setCatActiva(cat)}>
                        Descoperă +{prodCat.length - 4} aranjamente <IcoArrow />
                      </button>
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        ) : filtrate.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🌷</div>
            <p className="empty-title">Nicio creație găsită</p>
            <div className="empty-actions">
              {search && <button className="btn-reset" onClick={() => setSearch('')}>Resetează căutarea</button>}
              {catActiva !== 'Toate' && <button className="btn-reset" onClick={() => setCatActiva('Toate')}>Toate colecțiile</button>}
            </div>
          </div>
        ) : (
          <div className="filtered-section">
            {catActiva !== 'Toate' && (
              <div className="filtered-header">
                <h2 className="section-title">{catActiva}</h2>
                <span className="section-count">{filtrate.length} creații exclusive</span>
              </div>
            )}
            <div className="products-grid">
              {filtrate.map((produs, i) => (
                <Card
                  key={produs.id}
                  produs={produs}
                  index={i}
                  onDetalii={setProdusSelectat}
                  onAdauga={adaugaInCos}
                  favorit={favorite.has(produs.id)}
                  onFavorit={toggleFavorit}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Reviews */}
      <ReviewsSection />

      {/* Footer */}
      <Footer />

      {produsSelectat && (
        <Modal
          produs={produsSelectat}
          onClose={() => setProdusSelectat(null)}
          onAdauga={adaugaInCos}
          favorit={favorite.has(produsSelectat.id)}
          onFavorit={toggleFavorit}
        />
      )}
    </div>
  );
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  :root {
    --cream: #FAF8F4;
    --cream-dark: #F2EDE4;
    --ink: #1A1612;
    --ink-soft: #4A4540;
    --ink-muted: #8A8480;
    --rose: #C8516A;
    --rose-light: #F5E8EB;
    --rose-dark: #A03050;
    --gold: #B8935A;
    --gold-light: #F5EDD8;
    --border: rgba(26,22,18,0.1);
    --border-mid: rgba(26,22,18,0.18);
    --shadow-sm: 0 2px 12px rgba(26,22,18,0.06);
    --shadow-md: 0 8px 32px rgba(26,22,18,0.1);
    --shadow-lg: 0 20px 60px rgba(26,22,18,0.14);
    --font-serif: 'Cormorant Garamond', Georgia, serif;
    --font-sans: 'Jost', system-ui, sans-serif;
    --radius: 2px;
    --radius-lg: 4px;
    --transition: 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --cream: #131210;
      --cream-dark: #1C1A16;
      --ink: #F0EDE8;
      --ink-soft: #C8C4BC;
      --ink-muted: #7A7670;
      --border: rgba(240,237,232,0.1);
      --border-mid: rgba(240,237,232,0.18);
      --shadow-sm: 0 2px 12px rgba(0,0,0,0.3);
      --shadow-md: 0 8px 32px rgba(0,0,0,0.35);
      --shadow-lg: 0 20px 60px rgba(0,0,0,0.4);
      --rose-light: rgba(200,81,106,0.12);
      --gold-light: rgba(184,147,90,0.12);
    }
  }

  .meniu-root {
    min-height: 100vh;
    background: var(--cream);
    color: var(--ink);
    font-family: var(--font-sans);
    font-weight: 300;
  }

  /* ── Hero ── */
  .hero {
    position: relative;
    background: linear-gradient(160deg, var(--cream-dark) 0%, var(--cream) 100%);
    border-bottom: 1px solid var(--border);
    padding: 80px 24px 0;
    text-align: center;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(200,81,106,0.06) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-inner {
    position: relative;
    max-width: 680px;
    margin: 0 auto;
    padding-bottom: 52px;
  }
  .hero-eyebrow {
    display: inline-block;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: var(--rose);
    margin-bottom: 20px;
  }
  .hero-title {
    font-family: var(--font-serif);
    font-size: clamp(42px, 6vw, 72px);
    font-weight: 300;
    line-height: 1.05;
    color: var(--ink);
    margin: 0 0 20px;
    letter-spacing: -0.01em;
  }
  .hero-title em { font-style: italic; color: var(--rose); font-weight: 300; }
  .hero-sub {
    font-size: 14px;
    color: var(--ink-muted);
    line-height: 1.75;
    margin: 0 0 36px;
    font-weight: 300;
  }
  .hero-divider { position: relative; margin: 0; }

  .btn-hero-cart {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: var(--ink);
    color: var(--cream);
    border: none;
    padding: 14px 32px;
    font-family: var(--font-sans);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    cursor: pointer;
    position: relative;
    transition: background var(--transition), transform 0.2s;
  }
  .btn-hero-cart:hover { background: var(--rose-dark); transform: translateY(-1px); }
  .hero-cart-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: var(--rose);
    color: white;
    font-size: 10px;
    font-weight: 600;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* ── Controls ── */
  .controls-bar {
    position: sticky;
    top: 0;
    z-index: 30;
    background: var(--cream);
    border-bottom: 1px solid var(--border);
    backdrop-filter: blur(12px);
  }
  .controls-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }
  .cat-list {
    display: flex;
    gap: 0;
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    flex: 1;
  }
  .cat-list::-webkit-scrollbar { display: none; }
  .cat-btn {
    flex-shrink: 0;
    padding: 16px 20px;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    font-family: var(--font-sans);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--ink-muted);
    cursor: pointer;
    transition: color 0.2s, border-color 0.2s;
    white-space: nowrap;
  }
  .cat-btn:hover { color: var(--ink); }
  .cat-btn.active { color: var(--rose); border-bottom-color: var(--rose); }

  .controls-right {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
    padding: 10px 0;
  }

  .search-wrap { position: relative; display: flex; align-items: center; }
  .search-icon { position: absolute; left: 12px; color: var(--ink-muted); display: flex; align-items: center; }
  .search-input {
    background: var(--cream-dark);
    border: 1px solid var(--border);
    color: var(--ink);
    font-family: var(--font-sans);
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.08em;
    padding: 9px 32px 9px 34px;
    width: 180px;
    outline: none;
    transition: border-color 0.2s, width 0.3s;
    border-radius: var(--radius);
  }
  .search-input:focus { border-color: var(--ink-soft); width: 220px; }
  .search-input::placeholder { color: var(--ink-muted); }
  .search-clear {
    position: absolute; right: 10px;
    background: none; border: none;
    color: var(--ink-muted); cursor: pointer;
    display: flex; align-items: center; padding: 0;
  }

  .sort-wrap { position: relative; }
  .sort-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--cream-dark);
    border: 1px solid var(--border);
    color: var(--ink-soft);
    font-family: var(--font-sans);
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.08em;
    padding: 9px 14px;
    cursor: pointer;
    white-space: nowrap;
    transition: border-color 0.2s;
    border-radius: var(--radius);
  }
  .sort-btn:hover { border-color: var(--ink-soft); }
  .sort-dropdown {
    position: absolute;
    right: 0;
    top: calc(100% + 6px);
    background: var(--cream);
    border: 1px solid var(--border-mid);
    box-shadow: var(--shadow-md);
    min-width: 180px;
    z-index: 50;
    animation: dropIn 0.2s ease;
    border-radius: var(--radius-lg);
    overflow: hidden;
  }
  .sort-option {
    display: block; width: 100%; text-align: left;
    background: none; border: none;
    padding: 12px 18px;
    font-family: var(--font-sans);
    font-size: 11px; font-weight: 400;
    letter-spacing: 0.08em;
    color: var(--ink-soft); cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }
  .sort-option:hover { background: var(--cream-dark); color: var(--ink); }
  .sort-option.active { color: var(--rose); font-weight: 500; }

  /* ── Content Area ── */
  .content-area {
    max-width: 1280px;
    margin: 0 auto;
    padding: 60px 24px 80px;
  }
  .sections-list { display: flex; flex-direction: column; gap: 72px; }

  .section-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 32px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border);
  }
  .section-header-left { display: flex; align-items: baseline; gap: 12px; }
  .section-title {
    font-family: var(--font-serif);
    font-size: 32px; font-weight: 300;
    color: var(--ink); margin: 0;
    letter-spacing: 0.01em;
  }
  .section-count {
    font-size: 10px; font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--ink-muted);
  }
  .btn-see-all {
    display: inline-flex; align-items: center; gap: 6px;
    background: none; border: none;
    font-family: var(--font-sans);
    font-size: 10px; font-weight: 500;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--rose); cursor: pointer;
    transition: gap 0.2s; white-space: nowrap;
  }
  .btn-see-all:hover { gap: 10px; }

  /* ── Products Grid ── */
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 28px;
    justify-items: center;
  }
  @media (min-width: 900px) {
    .products-grid {
      grid-template-columns: repeat(auto-fit, minmax(260px, 300px));
      justify-content: center;
    }
  }

  /* ── Product Card ── */
  .product-card {
    display: flex;
    flex-direction: column;
    background: var(--cream);
    border: 1px solid var(--border);
    width: 100%;
    max-width: 300px;
    transition: box-shadow var(--transition), transform var(--transition), border-color var(--transition);
    animation: fadeSlideUp 0.5s ease both;
    border-radius: var(--radius-lg);
    overflow: hidden;
  }
  .product-card:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-4px);
    border-color: var(--border-mid);
  }

  .card-image-wrap {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    aspect-ratio: 3/4;
    background: var(--cream-dark);
    flex-shrink: 0;
  }
  .card-img {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    display: block;
  }
  .card-img.hovered { transform: scale(1.06); }
  .card-overlay {
    position: absolute; inset: 0;
    background: rgba(26,22,18,0.12);
    opacity: 0; transition: opacity var(--transition);
    pointer-events: none;
  }
  .card-overlay.visible { opacity: 1; }

  .badge-discount {
    position: absolute; top: 12px; right: 44px;
    background: var(--rose); color: white;
    font-size: 9px; font-weight: 600;
    letter-spacing: 0.08em; padding: 4px 8px;
    border-radius: 2px;
  }

  .btn-fav {
    position: absolute; top: 12px; right: 12px;
    width: 34px; height: 34px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.5);
    background: rgba(255,255,255,0.85);
    backdrop-filter: blur(8px);
    color: #9A9490;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: background var(--transition), color var(--transition), border-color var(--transition), transform 0.2s;
  }
  .btn-fav:hover { transform: scale(1.1); }
  .btn-fav.active { background: var(--rose); color: white; border-color: var(--rose); }

  .card-quick-view {
    position: absolute; bottom: 0; left: 0; right: 0;
    display: flex; justify-content: center; padding: 16px;
    opacity: 0; transform: translateY(8px);
    transition: opacity var(--transition), transform var(--transition);
    pointer-events: none;
  }
  .card-quick-view.visible { opacity: 1; transform: translateY(0); pointer-events: auto; }
  .btn-quick-view {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(250,248,244,0.95);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.6);
    color: var(--ink);
    font-family: var(--font-sans);
    font-size: 10px; font-weight: 500;
    letter-spacing: 0.12em; text-transform: uppercase;
    padding: 9px 18px; cursor: pointer;
    transition: background 0.2s;
    border-radius: var(--radius);
  }
  .btn-quick-view:hover { background: white; }

  .card-body {
    padding: 20px; display: flex;
    flex-direction: column; flex: 1; gap: 10px;
  }
  .card-meta { display: flex; align-items: center; justify-content: space-between; }
  .card-category { font-size: 9px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--rose); }
  .card-title {
    font-family: var(--font-serif);
    font-size: 18px; font-weight: 400;
    color: var(--ink); margin: 0; line-height: 1.3;
    cursor: pointer; transition: color 0.2s;
    letter-spacing: 0.01em;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .card-title:hover { color: var(--rose); }
  .card-desc {
    font-size: 12px; color: var(--ink-muted);
    line-height: 1.7; margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-weight: 300;
  }
  .card-footer {
    display: flex; align-items: center; justify-content: space-between;
    margin-top: auto; padding-top: 14px;
    border-top: 1px solid var(--border);
  }
  .card-price { display: flex; flex-direction: column; gap: 2px; }
  .price-main { font-size: 16px; font-weight: 500; color: var(--ink); letter-spacing: 0.03em; }
  .price-old { font-size: 11px; color: var(--ink-muted); text-decoration: line-through; }

  .btn-add {
    display: inline-flex; align-items: center; gap: 6px;
    background: transparent;
    border: 1px solid var(--border-mid);
    color: var(--ink-soft);
    font-family: var(--font-sans);
    font-size: 9px; font-weight: 600;
    letter-spacing: 0.15em; text-transform: uppercase;
    padding: 9px 16px; cursor: pointer;
    transition: all 0.25s ease;
    border-radius: var(--radius);
  }
  .btn-add:hover { background: var(--ink); color: var(--cream); border-color: var(--ink); transform: translateY(-1px); }
  .btn-add.added { background: #2d6a4f; color: white; border-color: #2d6a4f; }
  .btn-add.disabled { background: transparent; color: var(--ink-muted); border-color: var(--border); cursor: not-allowed; opacity: 0.5; transform: none; }

  .load-more-wrap { text-align: center; margin-top: 40px; }
  .btn-load-more {
    display: inline-flex; align-items: center; gap: 8px;
    background: transparent;
    border: 1px solid var(--border-mid);
    color: var(--ink-soft);
    font-family: var(--font-sans);
    font-size: 10px; font-weight: 500;
    letter-spacing: 0.15em; text-transform: uppercase;
    padding: 14px 32px; cursor: pointer;
    transition: all var(--transition);
    border-radius: var(--radius);
  }
  .btn-load-more:hover { background: var(--ink); color: var(--cream); border-color: var(--ink); }

  .filtered-header {
    display: flex; align-items: baseline; gap: 12px;
    margin-bottom: 32px; padding-bottom: 16px;
    border-bottom: 1px solid var(--border);
  }

  /* ── Modal ── */
  @keyframes backdropIn { from { opacity: 0 } to { opacity: 1 } }
  @keyframes modalIn { from { opacity: 0; transform: translateY(16px) scale(0.98) } to { opacity: 1; transform: translateY(0) scale(1) } }

  .modal-backdrop {
    position: fixed; inset: 0;
    background: rgba(10,8,5,0.6);
    backdrop-filter: blur(12px);
    z-index: 50;
    display: flex; align-items: center; justify-content: center;
    padding: 20px;
    animation: backdropIn 0.25s ease;
  }
  .modal-box {
    background: var(--cream);
    max-width: 780px; width: 100%;
    display: flex; flex-direction: row;
    position: relative;
    box-shadow: var(--shadow-lg);
    animation: modalIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    border-radius: var(--radius-lg);
    overflow: hidden;
    border: 1px solid var(--border);
  }
  @media (max-width: 600px) { .modal-box { flex-direction: column; } }
  .modal-close {
    position: absolute; top: 14px; right: 14px; z-index: 20;
    width: 32px; height: 32px;
    border-radius: 50%;
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(8px);
    border: 1px solid var(--border);
    color: var(--ink-soft);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: background 0.2s, color 0.2s;
  }
  .modal-close:hover { background: var(--ink); color: white; }
  .modal-img-side {
    position: relative; width: 45%; flex-shrink: 0;
    min-height: 360px; overflow: hidden; background: var(--cream-dark);
  }
  @media (max-width: 600px) { .modal-img-side { width: 100%; min-height: 240px; } }
  .modal-img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .modal-img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 50%); pointer-events: none; }
  .modal-cat-badge {
    position: absolute; bottom: 16px; left: 16px;
    background: rgba(250,248,244,0.92); backdrop-filter: blur(8px);
    color: var(--ink);
    font-size: 9px; font-weight: 600; letter-spacing: 0.18em;
    text-transform: uppercase; padding: 5px 12px; border-radius: 2px;
  }
  .modal-fav-btn {
    position: absolute; top: 16px; left: 16px;
    width: 34px; height: 34px;
    border-radius: 50%;
    background: rgba(255,255,255,0.85); backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.5);
    color: #9A9490;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.2s;
  }
  .modal-fav-btn.active { background: var(--rose); color: white; border-color: var(--rose); }
  .modal-content-side {
    flex: 1; padding: 36px 32px;
    display: flex; flex-direction: column; gap: 18px;
    overflow-y: auto;
  }
  .modal-rating-row { display: flex; align-items: center; gap: 10px; }
  .modal-review-count { font-size: 11px; color: var(--ink-muted); }
  .modal-title { font-family: var(--font-serif); font-size: 28px; font-weight: 300; color: var(--ink); margin: 0; line-height: 1.2; letter-spacing: 0.01em; }
  .modal-desc { font-size: 13px; color: var(--ink-muted); line-height: 1.7; margin: 0; font-weight: 300; }
  .modal-features { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .modal-feature {
    display: flex; align-items: flex-start; gap: 10px;
    background: var(--cream-dark); border: 1px solid var(--border);
    padding: 10px 12px; border-radius: var(--radius);
  }
  .feature-icon { font-size: 14px; line-height: 1; margin-top: 2px; }
  .feature-label { font-size: 9px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-muted); margin-bottom: 2px; }
  .feature-value { font-size: 12px; color: var(--ink); font-weight: 400; }
  .modal-price-row { display: flex; align-items: center; justify-content: space-between; }
  .modal-price { font-size: 28px; font-weight: 300; color: var(--ink); letter-spacing: 0.02em; }
  .modal-price-old { font-size: 14px; color: var(--ink-muted); text-decoration: line-through; margin-left: 8px; }
  .modal-discount-badge { background: var(--rose-light); color: var(--rose-dark); font-size: 11px; font-weight: 600; letter-spacing: 0.06em; padding: 5px 12px; border-radius: 2px; }
  .btn-modal-add {
    width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px;
    background: var(--ink); color: var(--cream); border: none; padding: 16px;
    font-family: var(--font-sans); font-size: 11px; font-weight: 500;
    letter-spacing: 0.18em; text-transform: uppercase;
    cursor: pointer; transition: background var(--transition), transform 0.2s;
    border-radius: var(--radius); margin-top: auto;
  }
  .btn-modal-add:hover { background: var(--rose-dark); transform: translateY(-1px); }
  .btn-modal-add:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }

  /* ── Toast ── */
  @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(16px) } to { opacity: 1; transform: translateX(-50%) translateY(0) } }
  .toast {
    position: fixed; bottom: 28px; left: 50%;
    transform: translateX(-50%);
    z-index: 60;
    background: var(--ink); color: var(--cream);
    display: inline-flex; align-items: center; gap: 12px;
    padding: 13px 22px;
    font-family: var(--font-sans); font-size: 11px; font-weight: 400;
    letter-spacing: 0.06em;
    box-shadow: var(--shadow-lg);
    animation: toastIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    white-space: nowrap;
    border-radius: var(--radius);
    border: 1px solid rgba(255,255,255,0.1);
  }
  .toast-check { color: #52b788; font-weight: 700; }
  .toast-name { max-width: 160px; overflow: hidden; text-overflow: ellipsis; font-weight: 500; }
  .toast-label { color: rgba(250,248,244,0.55); }

  /* ── Empty / Error ── */
  .empty-state, .error-state { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px 24px; text-align: center; gap: 12px; }
  .empty-icon, .error-icon { font-size: 44px; opacity: 0.35; }
  .empty-title, .error-title { font-family: var(--font-serif); font-size: 24px; font-weight: 300; color: var(--ink-soft); margin: 0; }
  .empty-actions { display: flex; gap: 16px; margin-top: 8px; }
  .btn-reset { background: none; border: none; font-family: var(--font-sans); font-size: 11px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--rose); cursor: pointer; text-decoration: underline; text-underline-offset: 4px; }
  .error-msg { font-size: 13px; color: var(--ink-muted); margin: 0; max-width: 360px; }
  .error-tips { background: var(--cream-dark); border: 1px solid var(--border); padding: 16px 20px; text-align: left; font-size: 12px; color: var(--ink-soft); display: flex; flex-direction: column; gap: 6px; max-width: 360px; width: 100%; border-radius: var(--radius-lg); margin-top: 4px; line-height: 1.6; }

  /* ── Skeleton ── */
  @keyframes shimmer { from { background-position: -400px 0 } to { background-position: 400px 0 } }
  .loading-grid { max-width: 1280px; margin: 60px auto; padding: 0 24px; display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 28px; }
  .skeleton-card { border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
  .skeleton-img { aspect-ratio: 3/4; background: linear-gradient(90deg, var(--cream-dark) 25%, var(--cream) 50%, var(--cream-dark) 75%); background-size: 800px 100%; animation: shimmer 1.5s infinite; }
  .skeleton-body { padding: 20px; display: flex; flex-direction: column; gap: 10px; }
  .skeleton-line { height: 12px; border-radius: 2px; background: linear-gradient(90deg, var(--cream-dark) 25%, var(--cream) 50%, var(--cream-dark) 75%); background-size: 800px 100%; animation: shimmer 1.5s infinite; }
  .skeleton-line.short { width: 40%; }
  .skeleton-line.medium { width: 70%; }
  .skeleton-line.long { width: 90%; }

  /* ── Animations ── */
  @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
  @keyframes dropIn { from { opacity: 0; transform: translateY(-6px) } to { opacity: 1; transform: translateY(0) } }

  /* ══════════════════════════════════════════════════
     REVIEWS SECTION
  ══════════════════════════════════════════════════ */
  .reviews-section {
    background: var(--cream-dark);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    padding: 80px 24px;
    position: relative;
    overflow: hidden;
  }
  .reviews-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 70% 60% at 50% 100%, rgba(200,81,106,0.05) 0%, transparent 70%);
    pointer-events: none;
  }
  .reviews-inner { max-width: 1280px; margin: 0 auto; position: relative; }
  .reviews-header { text-align: center; margin-bottom: 56px; }
  .reviews-eyebrow { display: inline-block; font-size: 10px; font-weight: 500; letter-spacing: 0.35em; text-transform: uppercase; color: var(--rose); margin-bottom: 16px; }
  .reviews-title { font-family: var(--font-serif); font-size: clamp(30px, 4vw, 48px); font-weight: 300; color: var(--ink); margin: 0 0 12px; line-height: 1.1; }
  .reviews-sub { font-size: 13px; color: var(--ink-muted); font-weight: 300; margin: 0 0 28px; line-height: 1.6; }
  .reviews-aggregate { display: inline-flex; align-items: center; gap: 16px; background: var(--cream); border: 1px solid var(--border); padding: 14px 24px; border-radius: var(--radius-lg); }
  .reviews-score { font-family: var(--font-serif); font-size: 40px; font-weight: 300; color: var(--ink); line-height: 1; }
  .reviews-count-label { font-size: 10px; color: var(--ink-muted); letter-spacing: 0.08em; font-weight: 400; }
  .reviews-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 40px; }
  @media (max-width: 900px) { .reviews-grid { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 600px) { .reviews-grid { grid-template-columns: 1fr; } }
  .review-card { background: var(--cream); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 28px; display: flex; flex-direction: column; gap: 14px; position: relative; transition: box-shadow var(--transition), transform var(--transition), border-color var(--transition); animation: fadeSlideUp 0.5s ease both; }
  .review-card:hover { box-shadow: var(--shadow-md); transform: translateY(-3px); border-color: var(--border-mid); }
  .review-quote-icon { position: absolute; top: 20px; right: 20px; color: var(--rose); }
  .review-stars { display: flex; gap: 3px; }
  .review-text { font-family: var(--font-serif); font-size: 15px; font-weight: 300; color: var(--ink-soft); line-height: 1.7; margin: 0; flex: 1; font-style: italic; }
  .review-tag { display: inline-block; background: var(--rose-light); color: var(--rose-dark); font-size: 9px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; padding: 4px 10px; border-radius: 2px; align-self: flex-start; }
  .review-author { display: flex; align-items: center; gap: 12px; padding-top: 14px; border-top: 1px solid var(--border); margin-top: auto; }
  .review-avatar { width: 38px; height: 38px; border-radius: 50%; background: linear-gradient(135deg, var(--rose-light) 0%, var(--gold-light) 100%); border: 1px solid var(--border-mid); display: flex; align-items: center; justify-content: center; font-family: var(--font-serif); font-size: 16px; font-weight: 400; color: var(--rose-dark); flex-shrink: 0; }
  .review-name { font-size: 13px; font-weight: 500; color: var(--ink); margin-bottom: 2px; }
  .review-date { font-size: 10px; color: var(--ink-muted); letter-spacing: 0.06em; }
  .reviews-nav { display: flex; align-items: center; justify-content: center; gap: 20px; }
  .reviews-nav-btn { width: 38px; height: 38px; border-radius: 50%; background: var(--cream); border: 1px solid var(--border-mid); color: var(--ink-soft); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; }
  .reviews-nav-btn:hover { background: var(--ink); color: var(--cream); border-color: var(--ink); }
  .reviews-dots { display: flex; gap: 8px; align-items: center; }
  .reviews-dot { width: 6px; height: 6px; border-radius: 50%; border: none; background: var(--border-mid); cursor: pointer; padding: 0; transition: all 0.25s ease; }
  .reviews-dot.active { background: var(--rose); width: 20px; border-radius: 3px; }
`;
