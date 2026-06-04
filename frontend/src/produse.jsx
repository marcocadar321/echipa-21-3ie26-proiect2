import React, { useState, useEffect } from 'react';
import { getImageUrl } from './api/strapi';

const BASE = 'http://localhost:1337';

export default function Produse({ searchQuery, selectedCategory, setSelectedCategory, setCartCount }) {
  const [listaProduse, setListaProduse]     = useState([]);
  const [categorii, setCategorii]           = useState([]);
  const [loading, setLoading]               = useState(true);
  const [produsSelectat, setProdusSelectat] = useState(null);
  const [optiuneSortare, setOptiuneSortare] = useState('implicit');
  const [hoveredId, setHoveredId]           = useState(null);

  /* ── fetch produse ── */
  useEffect(() => {
    Promise.all([
      fetch(`${BASE}/api/produses?populate=*`).then(r => r.json()),
      fetch(`${BASE}/api/categorii?populate=*&sort=Ordine:asc`).then(r => r.json()),
    ])
      .then(([prodRes, catRes]) => {
        if (prodRes.data) {
          const mapped = prodRes.data.map(item => {
            const a = item.attributes || item;
            const imgData = a.Imagine?.data?.attributes || a.Imagine;
            const imgUrl  = imgData?.url ? `${BASE}${imgData.url}` : null;
            const catData = a.categorii?.data?.attributes || a.categorii;
            return {
              id:         item.id,
              nume:       a.Nume        || 'Produs',
              descriere:  a.Descriere   || '',
              pret:       a.Pret        || 0,
              pretVechi:  a.PretVechi   || null,
              eticheta:   a.Eticheta    || null,
              isFeatured: a.IsFeatured  || false,
              imagine:    imgUrl,
              categorie:  catData?.Nume || 'Altele',
            };
          });
          setListaProduse(mapped);
        }
        if (catRes.data) {
          const cats = catRes.data.map(c => {
            const a = c.attributes || c;
            return { id: c.id, nume: a.Nume };
          });
          setCategorii(cats);
        }
        setLoading(false);
      })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  /* ── filtrare + sortare ── */
  const produseFiltrate = listaProduse
    .filter(p => {
      const catOk    = !selectedCategory || selectedCategory === 'Toate' || p.categorie === selectedCategory;
      const searchOk = !searchQuery || p.nume.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       p.descriere.toLowerCase().includes(searchQuery.toLowerCase());
      return catOk && searchOk;
    })
    .sort((a, b) => {
      if (optiuneSortare === 'pret-crescator')   return a.pret - b.pret;
      if (optiuneSortare === 'pret-descrescator') return b.pret - a.pret;
      return 0;
    });

  const adaugaInCos = (produs, e) => {
    e?.stopPropagation();
    setCartCount(prev => prev + 1);
  };

  /* ── badge color per eticheta ── */
  const badgeStyle = (eticheta) => {
    const map = {
      'Nou':        { bg: '#dcfce7', color: '#16a34a' },
      'Reducere':   { bg: '#fee2e2', color: '#dc2626' },
      'Popular':    { bg: '#fef9c3', color: '#ca8a04' },
      'Limitat':    { bg: '#ede9fe', color: '#7c3aed' },
    };
    return map[eticheta] || { bg: '#f1f5f9', color: '#64748b' };
  };

  /* ────────── LOADING ────────── */
  if (loading) return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'80px 0', gap:16 }}>
      <div style={{
        width:44, height:44, borderRadius:'50%',
        border:'3px solid #e2e8f0', borderTopColor:'#0f172a',
        animation:'spin 0.8s linear infinite'
      }}/>
      <p style={{ color:'#94a3b8', fontSize:13, letterSpacing:'0.05em' }}>Se încarcă produsele…</p>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  const categoriiFiltru = ['Toate', ...categorii.map(c => c.nume)];

  /* ────────── RENDER ────────── */
  return (
    <div style={{ maxWidth:1280, margin:'0 auto', padding:'48px 24px', fontFamily:"'Helvetica Neue', Arial, sans-serif" }}>

      {/* ── Bara filtre ── */}
      <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:16, marginBottom:40, paddingBottom:24, borderBottom:'1px solid #f1f5f9' }}>

        {/* Butoane categorii */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
          {categoriiFiltru.map(cat => {
            const activ = (selectedCategory || 'Toate') === cat;
            return (
              <button key={cat} onClick={() => setSelectedCategory(cat)}
                style={{
                  padding:'7px 18px', borderRadius:999, fontSize:12, fontWeight:600,
                  letterSpacing:'0.06em', textTransform:'uppercase', cursor:'pointer',
                  border: activ ? '1.5px solid #0f172a' : '1.5px solid #e2e8f0',
                  background: activ ? '#0f172a' : '#fff',
                  color:      activ ? '#fff'    : '#64748b',
                  transition:'all 0.18s',
                }}>
                {cat}
              </button>
            );
          })}
        </div>

        {/* Sortare */}
        <select value={optiuneSortare} onChange={e => setOptiuneSortare(e.target.value)}
          style={{
            padding:'7px 14px', borderRadius:10, fontSize:12, fontWeight:500,
            border:'1.5px solid #e2e8f0', background:'#fff', color:'#374151',
            cursor:'pointer', outline:'none',
          }}>
          <option value="implicit">Sortare implicită</option>
          <option value="pret-crescator">Preț: Mic → Mare</option>
          <option value="pret-descrescator">Preț: Mare → Mic</option>
        </select>
      </div>

      {/* ── Grid produse ── */}
      {produseFiltrate.length === 0 ? (
        <div style={{ textAlign:'center', padding:'80px 0', color:'#94a3b8', fontSize:14 }}>
          Niciun produs găsit.
        </div>
      ) : (
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))',
          gap:28,
        }}>
          {produseFiltrate.map(produs => {
            const isHovered = hoveredId === produs.id;
            const badge     = produs.eticheta ? badgeStyle(produs.eticheta) : null;
            return (
              <div key={produs.id}
                onMouseEnter={() => setHoveredId(produs.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setProdusSelectat(produs)}
                style={{
                  background:'#fff',
                  borderRadius:20,
                  overflow:'hidden',
                  border:'1px solid #f1f5f9',
                  boxShadow: isHovered ? '0 20px 50px -10px rgba(0,0,0,0.13)' : '0 2px 12px rgba(0,0,0,0.05)',
                  transform: isHovered ? 'translateY(-5px)' : 'none',
                  transition:'all 0.28s cubic-bezier(0.34,1.56,0.64,1)',
                  cursor:'pointer',
                  display:'flex', flexDirection:'column',
                }}>

                {/* Imagine */}
                <div style={{ position:'relative', paddingTop:'85%', background:'#f8fafc', overflow:'hidden' }}>
                  {produs.imagine ? (
                    <img src={produs.imagine} alt={produs.nume}
                      style={{
                        position:'absolute', inset:0, width:'100%', height:'100%',
                        objectFit:'cover',
                        transform: isHovered ? 'scale(1.07)' : 'scale(1)',
                        transition:'transform 0.45s ease',
                      }}/>
                  ) : (
                    <div style={{
                      position:'absolute', inset:0, display:'flex', alignItems:'center',
                      justifyContent:'center', color:'#cbd5e1', fontSize:42,
                    }}>🖼</div>
                  )}

                  {/* Badge eticheta */}
                  {badge && produs.eticheta && (
                    <span style={{
                      position:'absolute', top:12, left:12,
                      padding:'4px 10px', borderRadius:999, fontSize:10,
                      fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase',
                      background: badge.bg, color: badge.color,
                    }}>
                      {produs.eticheta}
                    </span>
                  )}

                  {/* Pret vechi badge */}
                  {produs.pretVechi && (
                    <span style={{
                      position:'absolute', top:12, right:12,
                      padding:'4px 10px', borderRadius:999, fontSize:10,
                      fontWeight:700, background:'#dc2626', color:'#fff',
                    }}>
                      -{Math.round((1 - produs.pret / produs.pretVechi) * 100)}%
                    </span>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding:'18px 20px 20px', display:'flex', flexDirection:'column', flexGrow:1 }}>
                  <span style={{ fontSize:10, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#94a3b8', marginBottom:6 }}>
                    {produs.categorie}
                  </span>
                  <h3 style={{ fontSize:15, fontWeight:700, color:'#0f172a', margin:'0 0 8px', lineHeight:1.35 }}>
                    {produs.nume}
                  </h3>
                  {produs.descriere && (
                    <p style={{ fontSize:12, color:'#64748b', lineHeight:1.6, margin:'0 0 16px',
                      display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                      {produs.descriere}
                    </p>
                  )}

                  {/* Pret + buton */}
                  <div style={{ marginTop:'auto', display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:14, borderTop:'1px solid #f1f5f9' }}>
                    <div>
                      <span style={{ fontSize:18, fontWeight:800, color:'#0f172a' }}>{produs.pret} lei</span>
                      {produs.pretVechi && (
                        <span style={{ fontSize:12, color:'#94a3b8', textDecoration:'line-through', marginLeft:7 }}>
                          {produs.pretVechi} lei
                        </span>
                      )}
                    </div>
                    <button
                      onClick={e => adaugaInCos(produs, e)}
                      style={{
                        background:'#0f172a', color:'#fff', border:'none',
                        padding:'9px 16px', borderRadius:12, fontSize:11,
                        fontWeight:700, cursor:'pointer', letterSpacing:'0.04em',
                        transition:'background 0.18s, transform 0.15s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background='#1e293b'}
                      onMouseLeave={e => e.currentTarget.style.background='#0f172a'}
                    >
                      + Coș
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Modal detalii produs ── */}
      {produsSelectat && (
        <div
          onClick={() => setProdusSelectat(null)}
          style={{
            position:'fixed', inset:0, background:'rgba(0,0,0,0.55)',
            backdropFilter:'blur(6px)', zIndex:50,
            display:'flex', alignItems:'center', justifyContent:'center', padding:24,
          }}>
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background:'#fff', borderRadius:24, maxWidth:640, width:'100%',
              overflow:'hidden', boxShadow:'0 40px 80px rgba(0,0,0,0.25)',
              display:'flex', flexDirection:'row',
              animation:'modalIn 0.28s cubic-bezier(0.34,1.56,0.64,1)',
            }}>
            <style>{`@keyframes modalIn{from{opacity:0;transform:scale(0.92)}to{opacity:1;transform:scale(1)}}`}</style>

            {/* Imagine modal */}
            <div style={{ width:'45%', minHeight:320, background:'#f8fafc', flexShrink:0, position:'relative' }}>
              {produsSelectat.imagine ? (
                <img src={produsSelectat.imagine} alt={produsSelectat.nume}
                  style={{ width:'100%', height:'100%', objectFit:'cover', position:'absolute', inset:0 }}/>
              ) : (
                <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%', fontSize:56, color:'#e2e8f0' }}>🖼</div>
              )}
            </div>

            {/* Info modal */}
            <div style={{ padding:'32px 28px', display:'flex', flexDirection:'column', justifyContent:'space-between', flexGrow:1 }}>
              <div>
                <button onClick={() => setProdusSelectat(null)}
                  style={{ position:'absolute', top:16, right:16, background:'#f1f5f9', border:'none', borderRadius:'50%', width:32, height:32, cursor:'pointer', fontSize:14, color:'#64748b' }}>
                  ✕
                </button>
                <span style={{ fontSize:10, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#94a3b8' }}>
                  {produsSelectat.categorie}
                </span>
                <h2 style={{ fontSize:22, fontWeight:800, color:'#0f172a', margin:'8px 0 16px', lineHeight:1.3 }}>
                  {produsSelectat.nume}
                </h2>
                {produsSelectat.eticheta && (
                  <span style={{
                    display:'inline-block', marginBottom:12,
                    padding:'4px 12px', borderRadius:999, fontSize:10, fontWeight:700,
                    letterSpacing:'0.08em', textTransform:'uppercase',
                    ...badgeStyle(produsSelectat.eticheta),
                  }}>
                    {produsSelectat.eticheta}
                  </span>
                )}
                <p style={{ fontSize:13, color:'#64748b', lineHeight:1.75 }}>
                  {produsSelectat.descriere || 'Nicio descriere disponibilă.'}
                </p>
              </div>

              <div style={{ marginTop:24 }}>
                <div style={{ display:'flex', alignItems:'baseline', gap:10, marginBottom:16 }}>
                  <span style={{ fontSize:26, fontWeight:800, color:'#0f172a' }}>{produsSelectat.pret} lei</span>
                  {produsSelectat.pretVechi && (
                    <span style={{ fontSize:14, color:'#94a3b8', textDecoration:'line-through' }}>{produsSelectat.pretVechi} lei</span>
                  )}
                </div>
                <button
                  onClick={e => { adaugaInCos(produsSelectat, e); setProdusSelectat(null); }}
                  style={{
                    width:'100%', background:'#0f172a', color:'#fff', border:'none',
                    padding:'13px', borderRadius:14, fontSize:13, fontWeight:700,
                    cursor:'pointer', letterSpacing:'0.04em', transition:'background 0.18s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background='#1e293b'}
                  onMouseLeave={e => e.currentTarget.style.background='#0f172a'}
                >
                  Adaugă în coș
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
