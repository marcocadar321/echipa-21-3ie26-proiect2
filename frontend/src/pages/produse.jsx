import React, { useState, useEffect } from 'react'

export default function Produse({ searchQuery, selectedCategory, setCartCount }) {
  const [listaProduse, setListaProduse] = useState([])
  const [produsSelectat, setProdusSelectat] = useState(null)
  const [optiuneSortare, setOptiuneSortare] = useState('implicit')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Apelăm endpoint-ul de articole creat de colegul tău
    fetch('http://localhost:1337/api/articles') 
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          // Mapăm datele conform proprietăților trimise de Strapi (titlu, subtitlu, categorie etc.)
          const produseMapate = res.data.map(item => {
            // Strapi poate trimite datele direct sau împachetate în `.attributes` (în funcție de versiunea v4)
            const attrs = item.attributes || item;
            
            return {
              id: item.id,
              nume: attrs.titlu || attrs.nume || 'Floare Spectrum', // Corelat cu "titlu" din backend
              descriere: attrs.subtitlu || attrs.descriere || 'O floare deosebită din colecția noastră.', // Corelat cu "subtitlu"
              categorie: attrs.categorie || 'Toate', // Categorii prestabilite din backend
              pret: attrs.pret || 120, // Dacă a pus un câmp de preț, altfel fallback implicit
              imagine: attrs.imagine || '/imagini/buchet_lalele_roz.jpg', // Calea imaginii locale sau din Strapi
              detalii: attrs.detalii || attrs.subtitlu || 'Detalii indisponibile momentan.'
            };
          })
          setListaProduse(produseMapate)
        }
        setLoading(false)
      })
      .catch((error) => {
        console.error("Eroare la conectarea cu colecția articles:", error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="text-center py-20 text-zinc-500 font-medium">
        Se încarcă florile din colecția de articole a backend-ului...
      </div>
    )
  }

  // Logica de Filtrare (Categorie + Căutare)
  let produseFiltrate = listaProduse.filter((produs) => {
    const potrivesteCategoria = selectedCategory === 'Toate' || produs.categorie === selectedCategory
    const potrivesteCautarea = produs.nume.toLowerCase().includes(searchQuery.toLowerCase()) || 
                               produs.descriere.toLowerCase().includes(searchQuery.toLowerCase())
    return potrivesteCategoria && potrivesteCautarea
  })

  // Logica pentru Sortarea după Preț
  if (optiuneSortare === 'pretCrescator') {
    produseFiltrate = [...produseFiltrate].sort((a, b) => a.pret - b.pret)
  } else if (optiuneSortare === 'pretDescrescator') {
    produseFiltrate = [...produseFiltrate].sort((a, b) => b.pret - a.pret)
  }

  // Funcția de adăugare în coș cu oprirea propagării evenimentului
  const adaugaInCos = (e) => {
    e.stopPropagation() 
    setCartCount((prevCount) => prevCount + 1)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Secțiunea de Titlu */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 font-sans tracking-tight">
          Produsele Noastre
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto mt-2 text-sm">
          Descoperă flori proaspete și aranjamente deosebite, create cu atenție de floriștii noștri locali.
        </p>
      </div>

      {/* Selectorul discret de Sortare */}
      <div className="flex justify-end mb-6">
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Ordonează:
          </label>
          <select
            id="sort"
            value={optiuneSortare}
            onChange={(e) => setOptiuneSortare(e.target.value)}
            className="text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 border border-transparent rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-pink-500 text-zinc-700 dark:text-zinc-200 cursor-pointer transition-colors"
          >
            <option value="implicit">Implicite</option>
            <option value="pretCrescator">Preț: Mic la Mare</option>
            <option value="pretDescrescator">Preț: Mare la Mic</option>
          </select>
        </div>
      </div>

      {/* Grid-ul de 4 coloane */}
      {produseFiltrate.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {produseFiltrate.map((produs) => (
            <div 
              key={produs.id} 
              onClick={() => setProdusSelectat(produs)}
              className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 group flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="relative overflow-hidden aspect-square bg-zinc-100 dark:bg-zinc-800">
                  <img 
                    src={produs.imagine} 
                    alt={produs.nume} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xs text-[10px] font-bold px-2.5 py-1 rounded-full text-zinc-700 dark:text-zinc-300 uppercase tracking-wider shadow-xs">
                    {produs.categorie}
                  </span>
                </div>
                <div className="p-4 text-left">
                  <h3 className="font-bold text-base text-zinc-800 dark:text-zinc-100 line-clamp-1">
                    {produs.nume}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 min-h-[32px]">
                    {produs.descriere}
                  </p>
                </div>
              </div>
              <div className="p-4 pt-0 text-left flex items-center justify-between gap-2">
                <span className="text-lg font-black text-pink-600 dark:text-pink-400">
                  {produs.pret} lei
                </span>
                <button 
                  onClick={adaugaInCos} 
                  className="bg-zinc-900 hover:bg-pink-600 text-white dark:bg-zinc-800 dark:hover:bg-pink-500 text-xs font-semibold px-3 py-2 rounded-xl transition-all cursor-pointer"
                >
                  Adaugă în coș
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
          <span className="text-3xl">🔍</span>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-sm font-medium">
            Nu am găsit niciun produs care să se potrivească.
          </p>
        </div>
      )}

      {/* FEREASTRA POP-UP (MODAL) */}
      {produsSelectat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-lg w-full overflow-hidden shadow-xl border border-zinc-100 dark:border-zinc-800 animate-in fade-in zoom-in-95 duration-150">
            <div className="relative aspect-video bg-zinc-100 dark:bg-zinc-800">
              <img src={produsSelectat.imagine} alt={produsSelectat.nume} className="w-full h-full object-cover" />
              <button 
                onClick={() => setProdusSelectat(null)}
                className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6 text-left">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-pink-100 text-pink-700 dark:bg-pink-950/40 dark:text-pink-400 rounded-full uppercase tracking-wider">
                  {produsSelectat.categorie}
                </span>
                <span className={`text-xs font-bold ${produsSelectat.stoc === 'În stoc' ? 'text-emerald-600' : 'text-amber-600'}`}>
                  ● {produsSelectat.stoc}
                </span>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{produsSelectat.nume}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-2">{produsSelectat.detalii}</p>
              
              <div className="mt-6 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-4">
                <span className="text-2xl font-black text-pink-600 dark:text-pink-400">{produsSelectat.pret} lei</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setProdusSelectat(null)}
                    className="px-4 py-2 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-300 transition-colors cursor-pointer"
                  >
                    Închide
                  </button>
                  <button 
                    onClick={(e) => { adaugaInCos(e); setProdusSelectat(null); }}
                    className="bg-zinc-900 hover:bg-pink-600 text-white dark:bg-zinc-800 dark:hover:bg-pink-500 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                  >
                    Adaugă în coș
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}