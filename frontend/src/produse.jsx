import React, { useState, useEffect } from 'react';

export default function Produse({ searchQuery, selectedCategory, setSelectedCategory, setCartCount }) {
  const [listaProduse, setListaProduse] = useState([]);
  const [categoriiDinamice, setCategoriiDinamice] = useState(['Toate']);
  const [loading, setLoading] = useState(true);
  const [produsSelectat, setProdusSelectat] = useState(null);
  const [optiuneSortare, setOptiuneSortare] = useState('implicit');

  // Preluarea datelor din Strapi v5 (Colecția ta 'Article')
  useEffect(() => {
    fetch('http://localhost:1337/api/articles')
      .then((response) => {
        if (!response.ok) throw new Error('Eroare la rețea');
        return response.json();
      })
      .then((res) => {
        if (res.data) {
          const produseMapate = res.data.map((item) => {
            const attrs = item.attributes || item;
            return {
              id: item.id,
              nume: attrs.Titlu || 'Floare fără nume',
              descriere: attrs.Descrierescurta || 'O floare deosebită pentru momente speciale.',
              categorie: attrs.Categorie || 'Altele',
              pret: attrs.pret || 125, // Fallback dacă nu ai setat preț în Strapi
              imagine: attrs.Imagine?.url ? `http://localhost:1337${attrs.Imagine.url}` : '/imagini/buchet_lalele_roz.jpg',
              detalii: attrs.Descrierescurta || 'Nu există detalii suplimentare.'
            };
          });

          setListaProduse(produseMapate);

          // Generare automată și unică de categorii din Strapi
          const categoriiExtrase = produseMapate.map(p => p.categorie);
          const categoriiUnice = ['Toate', ...new Set(categoriiExtrase)];
          setCategoriiDinamice(categoriiUnice);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Eroare Strapi:", error);
        setLoading(false);
      });
  }, []);

  // Logică de Filtrare, Căutare și Sortare
  const produseFiltrate = listaProduse
    .filter((produs) => {
      const sePotrivesteCategoria = selectedCategory === 'Toate' || produs.categorie === selectedCategory;
      const sePotrivesteCautarea = produs.nume.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                   produs.descriere.toLowerCase().includes(searchQuery.toLowerCase());
      return sePotrivesteCategoria && sePotrivesteCautarea;
    })
    .sort((a, b) => {
      if (optiuneSortare === 'pret-crescator') return a.pret - b.pret;
      if (optiuneSortare === 'pret-descrescator') return b.pret - a.pret;
      return 0;
    });

  const adaugaInCos = (produs) => {
    setCartCount((prev) => prev + 1);
    alert(`${produs.nume} a fost adăugat în coș!`);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 bg-transparent">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-zinc-900 dark:border-white mb-4"></div>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">Se deschid petalele bazei de date...</p>
      </div>
    );
  }

  return (
    <div className="bg-transparent py-12 px-6 max-w-7xl mx-auto">
      
      {/* Meniu Filtre Categorii Dinamice */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {categoriiDinamice.map((categorie) => (
            <button
              key={categorie}
              onClick={() => setSelectedCategory(categorie)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                selectedCategory === categorie
                  ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-sm'
                  : 'bg-white text-zinc-600 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700'
              }`}
            >
              {categorie}
            </button>
          ))}
        </div>

        {/* Filtru Sortare */}
        <select
          value={optiuneSortare}
          onChange={(e) => setOptiuneSortare(e.target.value)}
          className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 px-3 py-1.5 rounded-xl text-xs font-medium focus:outline-none"
        >
          <option value="implicit">Sortare implicită</option>
          <option value="pret-crescator">Preț: Mic → Mare</option>
          <option value="pret-descrescator">Preț: Mare → Mic</option>
        </select>
      </div>

      {/* Grid Produse */}
      {produseFiltrate.length === 0 ? (
        <div className="text-center py-16 text-zinc-400 text-sm">Nicio floare găsită în această selecție.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {produseFiltrate.map((produs) => (
            <div key={produs.id} className="bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group">
              <div className="relative overflow-hidden bg-zinc-100 dark:bg-zinc-900 pt-[100%] cursor-pointer" onClick={() => setProdusSelectat(produs)}>
                <img src={produs.imagine} alt={produs.nume} className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">{produs.categorie}</span>
                <h3 className="font-serif text-base text-zinc-900 dark:text-white mb-2 cursor-pointer hover:opacity-80" onClick={() => setProdusSelectat(produs)}>{produs.nume}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs line-clamp-2 mb-4 flex-grow">{produs.descriere}</p>
                <div className="flex justify-between items-center pt-3 border-t border-zinc-50 dark:border-zinc-700/50">
                  <span className="text-base font-bold text-zinc-900 dark:text-white">{produs.pret} lei</span>
                  <button onClick={() => adaugaInCos(produs)} className="bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 text-white text-[11px] font-bold px-3 py-2 rounded-lg shadow-sm">
                    Adaugă
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Pop-up Detalii */}
      {produsSelectat && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-800 rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl relative flex flex-col md:flex-row border dark:border-zinc-700">
            <button onClick={() => setProdusSelectat(null)} className="absolute top-3 right-3 bg-white dark:bg-zinc-700 text-zinc-800 dark:text-white p-1.5 rounded-full z-10 shadow text-xs">✕</button>
            <div className="w-full md:w-1/2 bg-zinc-100 dark:bg-zinc-900"><img src={produsSelectat.imagine} alt={produsSelectat.nume} className="w-full h-full object-cover min-h-[220px]" /></div>
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{produsSelectat.categorie}</span>
                <h2 className="font-serif text-xl text-zinc-900 dark:text-white mt-1 mb-3">{produsSelectat.nume}</h2>
                <p className="text-zinc-600 dark:text-zinc-300 text-xs leading-relaxed mb-4">{produsSelectat.detalii}</p>
              </div>
              <div>
                <div className="text-xl font-bold text-zinc-900 dark:text-white mb-3">{produsSelectat.pret} lei</div>
                <button onClick={() => { adaugaInCos(produsSelectat); setProdusSelectat(null); }} className="w-full bg-zinc-900 dark:bg-white dark:text-zinc-900 text-white py-2 rounded-xl font-semibold text-xs shadow">Adaugă în coș</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}