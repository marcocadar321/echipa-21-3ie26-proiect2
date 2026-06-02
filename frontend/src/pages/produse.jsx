import React from 'react'

export default function Produse({ searchQuery, selectedCategory, setCartCount }) {
  const listaProduse = [
    {
      id: 1,
      nume: 'Buchet Lalele Roz',
      categorie: 'Buchete',
      pret: 150,
      imagine: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?q=80&w=600&auto=format&fit=crop',
      descriere: 'Lalele proaspete de primăvară într-un aranjament delicat.'
    },
    {
      id: 2,
      nume: 'Trandafir Criogenat Roșu',
      categorie: 'Flori Criogenate',
      pret: 85,
      imagine: 'https://images.unsplash.com/photo-1533616688419-b7a585564566?q=80&w=600&auto=format&fit=crop',
      descriere: 'Un trandafir nemuritor care rezistă ani de zile fără apă.'
    },
    {
      id: 3,
      nume: 'Orhidee la Ghiveci',
      categorie: 'Plante',
      pret: 120,
      imagine: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=600&auto=format&fit=crop',
      descriere: 'Orhidee Phalaenopsis elegantă, perfectă pentru apartament.'
    },
    {
      id: 4,
      nume: 'Buchet Mixt de Vară',
      categorie: 'Buchete',
      pret: 210,
      imagine: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=600&auto=format&fit=crop',
      descriere: 'Combinație spectaculoasă de boboci de trandafiri și hortensii.'
    }
  ]

  const produseFiltrate = listaProduse.filter((produs) => {
    const potrivesteCategoria = selectedCategory === 'Toate' || produs.categorie === selectedCategory
    const potrivesteCautarea = produs.nume.toLowerCase().includes(searchQuery.toLowerCase()) || 
                               produs.descriere.toLowerCase().includes(searchQuery.toLowerCase())
    return potrivesteCategoria && potrivesteCautarea
  })

  // Funcție care se rulează la click pe buton
  const adaugaInCos = () => {
    setCartCount((prevCount) => prevCount + 1)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 font-sans tracking-tight">
          Produsele Noastre
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto mt-2 text-sm">
          Descoperă flori proaspete și aranjamente deosebite, create cu atenție de floriștii noștri locali.
        </p>
      </div>

      {produseFiltrate.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {produseFiltrate.map((produs) => (
            <div 
              key={produs.id} 
              className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
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
                  onClick={adaugaInCos} // Atașăm funcția pe buton
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
    </div>
  )
}