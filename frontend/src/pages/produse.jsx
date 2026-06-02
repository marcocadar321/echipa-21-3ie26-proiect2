import React, { useState } from 'react';

// Conținut real, fără Lorem Ipsum, pregătit pentru tema de Florărie
const DATE_PRODUSE = [
  { id: 1, nume: "Buchet 'Vis de Primăvară'", pret: 149, categorie: "Buchete", imagine: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=500", descriere: "Un buchet mixt superb realizat manual cu lalele roz pastel, frezii albe parfumate și crenguțe proaspete de eucalipt." },
  { id: 2, nume: "Trandafir Roșu Criogenat", pret: 89, categorie: "Flori Criogenate", imagine: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=500", descriere: "Trandafir roșu premium nemuritor securizat într-o cupolă elegantă de sticlă pe suport de lemn natural." },
  { id: 3, nume: "Orhidee Imperială la Ghiveci", pret: 120, categorie: "Plante", imagine: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?q=80&w=500", descriere: "Orhidee Phalaenopsis albă cu două tije bogate în flori, ideală pentru a aduce eleganță biroului sau livingului." },
  { id: 4, nume: "Buchet Ardent de Trandafiri", pret: 210, categorie: "Buchete", imagine: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=500", descriere: "Aranjament floral spectaculos compus din 19 trandafiri roșii catifelați importați din Ecuador." }
];

export default function Produse() {
  const [produse] = useState(DATE_PRODUSE);
  const [categorieActiva, setCategorieActiva] = useState("Toate");

  const categorii = ["Toate", "Buchete", "Flori Criogenate", "Plante"];

  const produseFiltrate = categorieActiva === "Toate" 
    ? produse 
    : produse.filter(p => p.categorie === categorieActiva);

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen py-12 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Antetul Paginii de Produse */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl font-serif">
            Produsele Noastre
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Descoperă flori proaspete și aranjamente deosebite, create cu atenție la detalii de floriștii noștri locali.
          </p>
        </div>

        {/* Bloc Filtrare pe Categorii */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categorii.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategorieActiva(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                categorieActiva === cat
                  ? "bg-pink-600 text-white shadow-md shadow-pink-500/20"
                  : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Responsive pentru Cardurile de Produse */}
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {produseFiltrate.map((produs) => (
            <div 
              key={produs.id} 
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Imagine wrapper cu efect hover */}
              <div className="h-64 overflow-hidden bg-zinc-200">
                <img
                  src={produs.imagine}
                  alt={produs.nume}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Conținut Card */}
              <div className="flex flex-1 flex-col p-6">
                <span className="text-xs font-bold tracking-wider text-pink-600 dark:text-pink-400 uppercase mb-2">
                  {produs.categorie}
                </span>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-pink-600 transition-colors">
                  {produs.nume}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 flex-1 line-clamp-3">
                  {produs.descriere}
                </p>
                
                {/* Preț și Buton acțiune */}
                <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <span className="text-xl font-black text-zinc-900 dark:text-white">
                    {produs.pret} Lei
                  </span>
                  <button className="rounded-xl bg-zinc-900 dark:bg-pink-600 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800 dark:hover:bg-pink-700 transition-colors shadow-sm">
                    Adaugă în coș
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}