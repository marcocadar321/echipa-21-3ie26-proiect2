import { useEffect, useState } from 'react';
import axios from 'axios';

// --- COMPONENTĂ: Hero Section Rafinată ---
const Hero = ({ data, loading, scrollY }) => {
  if (loading) return <div className="h-screen animate-pulse bg-rose-50" />;
  
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#fdf5f2]">
      {/* Imagine Background cu Parallax */}
      <div className="absolute inset-0 z-0">
        <img
          src={data?.ImagineHero?.url ? `http://localhost:1337${data.ImagineHero.url}` : 'https://images.unsplash.com/photo-1490750967868-88df5691cc30'}
          className="w-full h-full object-cover"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          alt="Flori"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <span className="inline-block px-4 py-1 mb-6 text-xs font-bold tracking-widest text-white uppercase bg-rose-500 rounded-full">
          Livrare rapidă în Timișoara
        </span>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
          {data?.Titlu || "Momente memorabile în fiecare petală"}
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10 font-light">
          {data?.Subtitlu || "Descoperă colecția noastră de aranjamente florale artizanale, create special pentru a aduce zâmbete."}
        </p>
        <button className="px-10 py-4 bg-white text-rose-600 font-bold rounded-full hover:scale-105 transition-transform shadow-xl">
          Vezi Colecția
        </button>
      </div>
    </section>
  );
};

// --- COMPONENTĂ: Card Produs (ArticleCard) Rafinat ---
const ArticleCard = ({ article }) => {
  return (
    <div className="bg-white rounded-[2rem] p-3 shadow-sm hover:shadow-2xl transition-all duration-300 border border-stone-100 group">
      <div className="relative aspect-square overflow-hidden rounded-[1.5rem] mb-4">
        <img 
          src={article.Imagine?.url ? `http://localhost:1337${article.Imagine.url}` : '/placeholder.jpg'}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          alt={article.Titlu}
        />
      </div>
      <div className="px-2 pb-2">
        <h3 className="text-lg font-bold text-stone-800 mb-1">{article.Titlu}</h3>
        <p className="text-rose-500 font-bold text-xl">{article.Pret} Lei</p>
      </div>
    </div>
  );
};

// --- MAIN HOME ---
const Home = () => {
  const [data, setData] = useState(null);
  const [articles, setArticles] = useState([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', () => setScrollY(window.scrollY));
    axios.get('http://localhost:1337/api/home?populate=*').then(res => setData(res.data.data));
    axios.get('http://localhost:1337/api/articles?populate=*').then(res => setArticles(res.data.data));
  }, []);

  return (
    <main className="bg-[#fdf5f2] min-h-screen text-stone-900">
      <Hero data={data} scrollY={scrollY} />

      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-stone-800 mb-4">Recomandările lunii</h2>
          <div className="w-20 h-1 bg-rose-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map(art => <ArticleCard key={art.id} article={art} />)}
        </div>
      </section>
    </main>
  );
};

export default Home;