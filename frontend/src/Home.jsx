import { useEffect, useState } from 'react';
import axios from 'axios';

// --- COMPONENTĂ: Hero Section (Designul tău) ---
const Hero = ({ data, loading, scrollY }) => {
  if (loading) return <div className="h-screen animate-pulse bg-rose-50" />;
  
  const attrs = data?.attributes || data;
  const imagineUrl = attrs?.ImagineHero?.url || attrs?.ImagineHero?.data?.attributes?.url;
  const fundalFinal = imagineUrl 
    

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#fdf5f2]">
      {/* Imagine Background cu Parallax */}
      <div className="absolute inset-0 z-0">
        <img
          src={fundalFinal}
          className="w-full h-full object-cover"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
          alt="Flori Fundal"
        />
        <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px]"></div>
      </div>

      {/* Content-ul tău */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto flex flex-col items-center">
        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-white uppercase bg-rose-500 rounded-full shadow-md">
          Livrare rapidă în Timișoara
        </span>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-md">
          {attrs?.Titlu || "Momente memorabele în fiecare petală"}
        </h1>
        <p className="text-md md:text-lg text-white/95 mb-10 font-light max-w-2xl drop-shadow-sm">
          {attrs?.Subtitlu || "Descoperă colecția noastră de aranjamente florale artizanale, create special pentru a aduce zâmbete."}
        </p>
        <button className="px-8 py-3.5 bg-white text-rose-600 font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-xl text-sm uppercase tracking-wider">
          Vezi Colecția
        </button>
      </div>
    </section>
  );
};

// --- MAIN HOME (Doar elementele tale) ---
const Home = () => {
  const [data, setData] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Chemăm DOAR endpoint-ul de home, fără articole/produse
    axios.get('http://localhost:1337/api/home?populate=*')
      .then((res) => {
        if (res.data?.data) setData(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Eroare incarcare date Home:", err);
        setLoading(false);
      });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="bg-[#fdf5f2] min-h-screen text-stone-900">
      {/* Randăm doar secțiunea ta principală */}
      <Hero data={data} scrollY={scrollY} loading={loading} />
    </main>
  );
};

export default Home;