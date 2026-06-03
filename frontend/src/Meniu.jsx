import React, { useState, useEffect, useRef } from 'react';

// ─── Constante ────────────────────────────────────────────────────────────────
const STRAPI_URL = 'http://localhost:1337';

// ─── Icoane SVG (dimensiuni fixe px, compatibil Tailwind 4) ──────────────────
const IcoCart = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
);
const IcoHeart = ({ filled }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const IcoClose = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IcoSearch = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IcoStar = ({ filled }) => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill={filled ? '#f59e0b' : 'none'} stroke="#f59e0b" strokeWidth="1.5">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
  </svg>
);
const IcoChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const IcoFilter = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
  </svg>
);
const IcoArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getImageUrl = (attrs) => {
  const imgData = attrs?.Imagine?.data ?? attrs?.Imagine;
  if (!imgData) return null;
  const imgAttrs = imgData.attributes ?? imgData;
  const url =
    imgAttrs?.formats?.medium?.url ??
    imgAttrs?.formats?.small?.url ??
    imgAttrs?.url ??
    null;
  if (!url) return null;
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
};

const mapArticle = (item) => {
  const attrs = item.attributes ?? item;
  return {
    id: item.id,
    documentId: item.documentId ?? null,
    nume: attrs.Titlu ?? 'Produs fără nume',
    descriere: attrs.Descrierescurta ?? 'O floare deosebită pentru momente speciale.',
    categorie: attrs.Categorie ?? 'Altele',
    pret: attrs.pret ?? 125,
    pretVechi: attrs.pretVechi ?? null,
    stoc: attrs.stoc ?? null,
    rating: attrs.rating ?? 4,
    imagine: getImageUrl(attrs) ?? 'https://images.unsplash.com/photo-1490750967868-88df5691cc45?w=600&q=80',
  };
};

// ─── Sub-componente ───────────────────────────────────────────────────────────

const Stele = ({ rating = 4 }) => (
  <div style={{ display: 'flex', gap: 2 }}>
    {[1,2,3,4,5].map(i => <IcoStar key={i} filled={i <= rating} />)}
  </div>
);

const BadgeStoc = ({ stoc }) => {
  if (stoc === undefined || stoc === null) return null;
  const cfg =
    stoc <= 0  ? { text: 'Epuizat',       cls: 'bg-red-100 text-red-600 border-red-200' } :
    stoc <= 5  ? { text: `Ultimele ${stoc}`, cls: 'bg-amber-100 text-amber-700 border-amber-200' } :
                 { text: 'În stoc',        cls: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
  return (
    <span className={`absolute top-3 left-3 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${cfg.cls}`}>
      {cfg.text}
    </span>
  );
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const Skeleton = () => (
  <div className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-100 dark:border-zinc-800 animate-pulse">
    <div className="bg-zinc-200 dark:bg-zinc-700" style={{ paddingTop: '100%' }} />
    <div className="p-5 space-y-3">
      <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded w-1/3" />
      <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4" />
      <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded" />
      <div className="flex justify-between pt-2">
        <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-1/4" />
        <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded-xl w-1/3" />
      </div>
    </div>
  </div>
);

// ─── Card Produs ──────────────────────────────────────────────────────────────
const Card = ({ produs, onDetalii, onAdauga, favorit, onFavorit }) => {
  const [adaugat, setAdaugat] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  const handleAdauga = (e) => {
    e.stopPropagation();
    if (produs.stoc === 0) return;
    setAdaugat(true);
    onAdauga(produs);
    setTimeout(() => setAdaugat(false), 2000);
  };

  const src = imgErr
    ? 'https://images.unsplash.com/photo-1490750967868-88df5691cc45?w=600&q=80'
    : produs.imagine;

  return (
    <article className="group relative bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col">

      {/* Imagine */}
      <div
        className="relative overflow-hidden bg-zinc-50 dark:bg-zinc-800 cursor-pointer"
        style={{ paddingTop: '100%' }}
        onClick={() => onDetalii(produs)}
      >
        <img
          src={src}
          alt={produs.nume}
          onError={() => setImgErr(true)}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

        <BadgeStoc stoc={produs.stoc} />

        {/* Favorit */}
        <button
          onClick={(e) => { e.stopPropagation(); onFavorit(produs.id); }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow transition-all duration-200 ${
            favorit ? 'bg-rose-500 text-white' : 'bg-white/80 dark:bg-zinc-700/80 text-zinc-400 hover:text-rose-500'
          }`}
        >
          <IcoHeart filled={favorit} />
        </button>

        {/* Quick view */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
          <button
            onClick={() => onDetalii(produs)}
            className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 whitespace-nowrap"
          >
            <IcoSearch /> Detalii rapide
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-rose-400">{produs.categorie}</span>
          <Stele rating={produs.rating} />
        </div>

        <h3
          className="font-serif text-[15px] leading-snug text-zinc-900 dark:text-white mb-2 cursor-pointer hover:text-rose-600 dark:hover:text-rose-400 transition-colors line-clamp-2"
          onClick={() => onDetalii(produs)}
        >
          {produs.nume}
        </h3>

        <p className="text-zinc-500 dark:text-zinc-400 text-[11px] leading-relaxed line-clamp-2 mb-4 flex-grow">
          {produs.descriere}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800">
          <div>
            <span className="text-lg font-black text-zinc-900 dark:text-white">{produs.pret} lei</span>
            {produs.pretVechi && (
              <span className="ml-1.5 text-xs text-zinc-400 line-through">{produs.pretVechi} lei</span>
            )}
          </div>

          <button
            onClick={handleAdauga}
            disabled={produs.stoc === 0}
            className={`flex items-center gap-1.5 text-[11px] font-bold px-3.5 py-2 rounded-xl shadow-sm transition-all duration-300 ${
              adaugat
                ? 'bg-emerald-500 text-white scale-95'
                : produs.stoc === 0
                ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-400 cursor-not-allowed'
                : 'bg-zinc-900 hover:bg-rose-600 text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-rose-500 dark:hover:text-white'
            }`}
          >
            {adaugat ? <>✓ Adăugat!</> : <><IcoCart /> Adaugă</>}
          </button>
        </div>
      </div>
    </article>
  );
};

// ─── Modal Detalii ────────────────────────────────────────────────────────────
const Modal = ({ produs, onClose, onAdauga, favorit, onFavorit }) => {
  const backdropRef = useRef(null);
  const [imgErr, setImgErr] = useState(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      ref={backdropRef}
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
      className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
      style={{ animation: 'fadeIn .2s ease' }}
    >
      <div
        className="bg-white dark:bg-zinc-900 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row relative"
        style={{ animation: 'slideUp .3s ease' }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 text-zinc-700 dark:text-white rounded-full flex items-center justify-center transition-colors"
        >
          <IcoClose />
        </button>

        {/* Imagine */}
        <div className="relative w-full md:w-1/2 min-h-[260px] bg-zinc-50 dark:bg-zinc-800 flex-shrink-0">
          <img
            src={imgErr ? 'https://images.unsplash.com/photo-1490750967868-88df5691cc45?w=600&q=80' : produs.imagine}
            alt={produs.nume}
            onError={() => setImgErr(true)}
            className="w-full h-full object-cover absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          <span className="absolute bottom-4 left-4 bg-white/90 dark:bg-zinc-900/90 text-rose-500 text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full">
            {produs.categorie}
          </span>
          <button
            onClick={() => onFavorit(produs.id)}
            className={`absolute top-4 left-4 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all ${
              favorit ? 'bg-rose-500 text-white' : 'bg-white/80 dark:bg-zinc-700/80 text-zinc-400'
            }`}
          >
            <IcoHeart filled={favorit} />
          </button>
        </div>

        {/* Detalii */}
        <div className="w-full md:w-1/2 p-7 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Stele rating={produs.rating} />
              <span className="text-[10px] text-zinc-400">(24 recenzii)</span>
            </div>
            <h2 className="font-serif text-2xl text-zinc-900 dark:text-white leading-tight mb-3">{produs.nume}</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-5">{produs.descriere}</p>

            {/* Detalii extra */}
            <div className="grid grid-cols-2 gap-2">
              {[
                ['Livrare', '24h'],
                ['Prospețime', '7+ zile'],
                ['Origine', 'România'],
                ['Ambalaj', 'Cadou incl.'],
              ].map(([label, val]) => (
                <div key={label} className="bg-zinc-50 dark:bg-zinc-800 rounded-xl px-3 py-2">
                  <div className="text-[9px] uppercase tracking-widest text-zinc-400 mb-0.5">{label}</div>
                  <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{val}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-black text-zinc-900 dark:text-white">{produs.pret} lei</span>
              {produs.pretVechi && (
                <span className="text-sm text-zinc-400 line-through">{produs.pretVechi} lei</span>
              )}
            </div>
            <button
              onClick={() => { onAdauga(produs); onClose(); }}
              disabled={produs.stoc === 0}
              className="w-full bg-zinc-900 hover:bg-rose-600 dark:bg-white dark:text-zinc-900 dark:hover:bg-rose-500 dark:hover:text-white text-white py-3 rounded-2xl font-bold text-sm shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <IcoCart />
              {produs.stoc === 0 ? 'Produs epuizat' : 'Adaugă în coș'}
              <span className="group-hover:translate-x-1 transition-transform duration-200"><IcoArrow /></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Coș lateral (drawer) ─────────────────────────────────────────────────────
const CosDrawer = ({ open, onClose, items, onRemove, onClear }) => {
  const total = items.reduce((s, i) => s + i.pret * i.qty, 0);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={onClose}
          style={{ animation: 'fadeIn .2s ease' }}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-zinc-900 z-50 shadow-2xl flex flex-col transition-transform duration-400 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <h2 className="font-serif text-lg text-zinc-900 dark:text-white">Coșul tău</h2>
            <p className="text-xs text-zinc-400">{items.length} {items.length === 1 ? 'produs' : 'produse'}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 bg-zinc-100 dark:bg-zinc-700 rounded-full flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors">
            <IcoClose />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="text-5xl mb-4 opacity-30">🌸</div>
              <p className="text-zinc-400 font-serif">Coșul este gol.</p>
              <p className="text-xs text-zinc-300 dark:text-zinc-600 mt-1">Adaugă câteva flori frumoase!</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 items-center bg-zinc-50 dark:bg-zinc-800 rounded-2xl p-3">
                <img
                  src={item.imagine}
                  alt={item.nume}
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1490750967868-88df5691cc45?w=100&q=80'; }}
                  className="w-14 h-14 object-cover rounded-xl flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate">{item.nume}</p>
                  <p className="text-[11px] text-zinc-400">{item.qty} × {item.pret} lei</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-sm font-bold text-zinc-900 dark:text-white">{item.qty * item.pret} lei</span>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-[10px] text-zinc-400 hover:text-red-500 transition-colors"
                  >
                    Elimină
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500 dark:text-zinc-400">Subtotal</span>
              <span className="font-black text-zinc-900 dark:text-white text-lg">{total} lei</span>
            </div>
            <button className="w-full bg-zinc-900 hover:bg-rose-600 dark:bg-white dark:text-zinc-900 dark:hover:bg-rose-500 dark:hover:text-white text-white py-3 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2">
              Finalizează comanda <IcoArrow />
            </button>
            <button onClick={onClear} className="w-full text-xs text-zinc-400 hover:text-red-400 transition-colors py-1">
              Golește coșul
            </button>
          </div>
        )}
      </div>
    </>
  );
};

// ─── Componenta Principală: Meniu ─────────────────────────────────────────────
export default function Meniu({ setCartCount }) {
  const [produse, setProduse] = useState([]);
  const [categorii, setCategorii] = useState(['Toate']);
  const [catActiva, setCatActiva] = useState('Toate');
  const [loading, setLoading] = useState(true);
  const [eroare, setEroare] = useState(null);
  const [search, setSearch] = useState('');
  const [sortare, setSortare] = useState('implicit');
  const [produsSelectat, setProdusSelectat] = useState(null);
  const [favorite, setFavorite] = useState(new Set());
  const [cos, setCos] = useState([]); // [{ ...produs, qty }]
  const [cosOpen, setCosOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef(null);

  // ── Fetch Strapi ────────────────────────────────────────────────────────
  useEffect(() => {
    fetch(`${STRAPI_URL}/api/articles?populate=*`)
      .then(r => {
        if (!r.ok) throw new Error(`Eroare server: ${r.status}`);
        return r.json();
      })
      .then(json => {
        if (!json.data) throw new Error('Răspuns invalid de la Strapi');
        const mapped = json.data.map(mapArticle);
        setProduse(mapped);
        const cats = ['Toate', ...new Set(mapped.map(p => p.categorie))];
        setCategorii(cats);
        setLoading(false);
      })
      .catch(err => {
        setEroare(err.message);
        setLoading(false);
      });
  }, []);

  // ── Închide dropdown sortare la click afară ─────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // ── Filtrare + sortare ──────────────────────────────────────────────────
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

  // ── Acțiuni coș ─────────────────────────────────────────────────────────
  const adaugaInCos = (produs) => {
    setCos(prev => {
      const exist = prev.find(i => i.id === produs.id);
      if (exist) return prev.map(i => i.id === produs.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...produs, qty: 1 }];
    });
    if (setCartCount) setCartCount(prev => prev + 1);
    setToast(produs.nume);
    setTimeout(() => setToast(null), 3000);
  };

  const eliminaDinCos = (id) => {
    setCos(prev => {
      const item = prev.find(i => i.id === id);
      if (!item) return prev;
      if (setCartCount) setCartCount(c => Math.max(0, c - item.qty));
      return prev.filter(i => i.id !== id);
    });
  };

  const golesteCos = () => {
    if (setCartCount) setCartCount(0);
    setCos([]);
  };

  const totalCos = cos.reduce((s, i) => s + i.qty, 0);

  const sortLabel = {
    'implicit': 'Sortare',
    'pret-asc': 'Preț ↑',
    'pret-desc': 'Preț ↓',
    'nume': 'Nume A–Z',
  }[sortare];

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Hero skeleton */}
      <div className="h-48 bg-zinc-100 dark:bg-zinc-800 rounded-3xl animate-pulse mb-10" />
      {/* Categorii skeleton */}
      <div className="flex gap-2 mb-8">
        {[1,2,3,4].map(i => <div key={i} className="h-8 w-24 bg-zinc-100 dark:bg-zinc-800 rounded-full animate-pulse" />)}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => <Skeleton key={i} />)}
      </div>
    </div>
  );

  // ── Eroare ───────────────────────────────────────────────────────────────
  if (eroare) return (
    <div className="py-24 px-6 max-w-xl mx-auto text-center">
      <div className="text-5xl mb-4">🌸</div>
      <h3 className="font-serif text-xl text-zinc-800 dark:text-white mb-2">Nu am putut încărca florile</h3>
      <p className="text-zinc-400 text-sm mb-4">{eroare}</p>
      <div className="bg-zinc-50 dark:bg-zinc-800 rounded-2xl p-4 text-left text-xs text-zinc-400 font-mono space-y-1">
        <p>✓ Strapi rulează pe <strong className="text-zinc-700 dark:text-zinc-200">localhost:1337</strong>?</p>
        <p>✓ Colecția <strong className="text-zinc-700 dark:text-zinc-200">Article</strong> este publicată?</p>
        <p>✓ Rolul <strong className="text-zinc-700 dark:text-zinc-200">Public</strong> are <strong className="text-zinc-700 dark:text-zinc-200">find</strong> + <strong className="text-zinc-700 dark:text-zinc-200">findOne</strong> bifat?</p>
      </div>
    </div>
  );

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
        @keyframes toastIn { from { opacity:0; transform:translateX(-50%) translateY(20px) } to { opacity:1; transform:translateX(-50%) translateY(0) } }
      `}</style>

      {/* ── Toast notificare ──────────────────────────────────────────── */}
      {toast && (
        <div
          className="fixed bottom-6 left-1/2 z-50 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-semibold px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2"
          style={{ animation: 'toastIn .3s ease', transform: 'translateX(-50%)' }}
        >
          <span className="text-emerald-400 dark:text-emerald-600">✓</span>
          <span className="max-w-[200px] truncate">{toast}</span>
          <span>adăugat!</span>
        </div>
      )}

      {/* ── Hero Banner ───────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-zinc-100 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900 px-4 sm:px-6 pt-12 pb-14">
        {/* Decorative blobs */}
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-rose-200/40 dark:bg-rose-900/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-pink-200/40 dark:bg-pink-900/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/70 dark:bg-zinc-800/70 backdrop-blur-sm text-rose-500 text-[10px] font-black uppercase tracking-[0.25em] px-3 py-1.5 rounded-full border border-rose-100 dark:border-rose-900 mb-4">
                <span>🌸</span> Colecția noastră
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl text-zinc-900 dark:text-white leading-[1.1] mb-2">
                Buchete &<br />
                <span className="text-rose-500">Aranjamente</span>
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-sm mt-3">
                Flori proaspete, aranjate cu grijă, livrate în 24 de ore oriunde în oraș.
              </p>
            </div>

            {/* Stats + Buton coș */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="hidden sm:flex gap-6">
                {[
                  ['🌺', `${produse.length}`, 'produse'],
                  ['📦', '24h', 'livrare'],
                  ['⭐', '4.9', 'rating'],
                ].map(([ico, val, lbl]) => (
                  <div key={lbl} className="text-center">
                    <div className="text-lg">{ico}</div>
                    <div className="font-black text-zinc-900 dark:text-white text-sm">{val}</div>
                    <div className="text-[10px] text-zinc-400 uppercase tracking-wide">{lbl}</div>
                  </div>
                ))}
              </div>

              {/* Buton coș */}
              <button
                onClick={() => setCosOpen(true)}
                className="relative bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-5 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 hover:bg-rose-600 dark:hover:bg-rose-500 dark:hover:text-white transition-all duration-300 shadow-lg"
              >
                <IcoCart />
                Coș
                {totalCos > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow">
                    {totalCos}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bara de filtre sticky ─────────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">

          {/* Categorii scroll */}
          <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-hide flex-1">
            {categorii.map(cat => (
              <button
                key={cat}
                onClick={() => setCatActiva(cat)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wide transition-all duration-200 ${
                  catActiva === cat
                    ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-md'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Dreapta: search + sort + contor */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Search input */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
                <IcoSearch />
              </span>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Caută..."
                className="bg-zinc-100 dark:bg-zinc-800 border-0 text-zinc-700 dark:text-zinc-300 pl-8 pr-3 py-1.5 rounded-xl text-[11px] font-medium focus:outline-none focus:ring-2 focus:ring-rose-300 dark:focus:ring-rose-700 w-32 sm:w-40 placeholder-zinc-400"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                >
                  <IcoClose />
                </button>
              )}
            </div>

            {/* Dropdown sortare custom */}
            <div className="relative" ref={sortRef}>
              <button
                onClick={() => setSortOpen(o => !o)}
                className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-3 py-1.5 rounded-xl text-[11px] font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                <IcoFilter />
                {sortLabel}
                <IcoChevronDown />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-1 w-44 bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-2xl shadow-xl overflow-hidden z-50"
                  style={{ animation: 'slideUp .15s ease' }}>
                  {[
                    ['implicit', 'Implicit'],
                    ['pret-asc', 'Preț: Mic → Mare'],
                    ['pret-desc', 'Preț: Mare → Mic'],
                    ['nume', 'Nume A–Z'],
                  ].map(([val, label]) => (
                    <button
                      key={val}
                      onClick={() => { setSortare(val); setSortOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-[11px] font-medium transition-colors ${
                        sortare === val
                          ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-900'
                          : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Contor */}
            <span className="hidden sm:block text-[11px] text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1.5 rounded-xl font-medium">
              {filtrate.length} {filtrate.length === 1 ? 'produs' : 'produse'}
            </span>
          </div>
        </div>
      </div>

      {/* ── Conținut principal ────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* Secțiuni pe categorie (când "Toate" e selectat) */}
        {catActiva === 'Toate' && !search ? (
          <div className="space-y-14">
            {categorii.filter(c => c !== 'Toate').map(cat => {
              const prodCat = filtrate.filter(p => p.categorie === cat);
              if (prodCat.length === 0) return null;
              return (
                <section key={cat}>
                  {/* Header secțiune */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-8 bg-rose-400 rounded-full" />
                      <h2 className="font-serif text-2xl text-zinc-900 dark:text-white">{cat}</h2>
                      <span className="text-xs text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full font-medium">
                        {prodCat.length}
                      </span>
                    </div>
                    <button
                      onClick={() => setCatActiva(cat)}
                      className="text-xs text-rose-400 hover:text-rose-600 font-semibold flex items-center gap-1 transition-colors"
                    >
                      Vezi toate <IcoArrow />
                    </button>
                  </div>

                  {/* Grid - max 4 per secțiune */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {prodCat.slice(0, 4).map(produs => (
                      <Card
                        key={produs.id}
                        produs={produs}
                        onDetalii={setProdusSelectat}
                        onAdauga={adaugaInCos}
                        favorit={favorite.has(produs.id)}
                        onFavorit={id => setFavorite(prev => {
                          const n = new Set(prev);
                          n.has(id) ? n.delete(id) : n.add(id);
                          return n;
                        })}
                      />
                    ))}
                  </div>

                  {prodCat.length > 4 && (
                    <div className="text-center mt-6">
                      <button
                        onClick={() => setCatActiva(cat)}
                        className="inline-flex items-center gap-2 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-rose-400 hover:text-rose-500 px-6 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200"
                      >
                        +{prodCat.length - 4} produse în "{cat}" <IcoArrow />
                      </button>
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        ) : (
          /* Grid simplu când e filtrat */
          filtrate.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="text-6xl mb-4 opacity-30">🌷</div>
              <p className="font-serif text-lg text-zinc-400">Nicio floare găsită.</p>
              <div className="flex gap-2 mt-4">
                {search && (
                  <button onClick={() => setSearch('')} className="text-xs text-rose-400 hover:text-rose-600 font-semibold underline underline-offset-4">
                    Șterge căutarea
                  </button>
                )}
                {catActiva !== 'Toate' && (
                  <button onClick={() => setCatActiva('Toate')} className="text-xs text-rose-400 hover:text-rose-600 font-semibold underline underline-offset-4">
                    Resetează filtrul
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div>
              {/* Header categorie selectată */}
              {catActiva !== 'Toate' && (
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-8 bg-rose-400 rounded-full" />
                  <h2 className="font-serif text-2xl text-zinc-900 dark:text-white">{catActiva}</h2>
                  <span className="text-xs text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full font-medium">
                    {filtrate.length} produse
                  </span>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filtrate.map(produs => (
                  <Card
                    key={produs.id}
                    produs={produs}
                    onDetalii={setProdusSelectat}
                    onAdauga={adaugaInCos}
                    favorit={favorite.has(produs.id)}
                    onFavorit={id => setFavorite(prev => {
                      const n = new Set(prev);
                      n.has(id) ? n.delete(id) : n.add(id);
                      return n;
                    })}
                  />
                ))}
              </div>
            </div>
          )
        )}
      </div>

      {/* ── Modal detalii ─────────────────────────────────────────────── */}
      {produsSelectat && (
        <Modal
          produs={produsSelectat}
          onClose={() => setProdusSelectat(null)}
          onAdauga={adaugaInCos}
          favorit={favorite.has(produsSelectat.id)}
          onFavorit={id => setFavorite(prev => {
            const n = new Set(prev);
            n.has(id) ? n.delete(id) : n.add(id);
            return n;
          })}
        />
      )}

      {/* ── Coș drawer ────────────────────────────────────────────────── */}
      <CosDrawer
        open={cosOpen}
        onClose={() => setCosOpen(false)}
        items={cos}
        onRemove={eliminaDinCos}
        onClear={golesteCos}
      />
    </div>
  );
}