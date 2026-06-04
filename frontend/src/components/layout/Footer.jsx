export default function Footer() {
  return (
    <footer className="py-24 px-12 border-t border-white/10" style={{ backgroundColor: '#111111' }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
        
        {/* Stânga: Copyright - Mărit */}
        <div className="text-white/50 text-lg font-medium tracking-wide order-2 md:order-1">
          © {new Date().getFullYear()} FLORI. Toate drepturile rezervate.
        </div>

        {/* Centru: ANPC și Social - Mărit */}
        <div className="flex flex-col items-center gap-8 order-1 md:order-2">
          <a 
            href="https://anpc.ro/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xl font-bold text-[#C8A882] hover:text-white transition-colors uppercase tracking-[0.3em]"
          >
            ANPC
          </a>
          <div className="flex gap-16 text-xl font-medium text-white/70">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#C8A882] transition-all hover:scale-110">Facebook</a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#C8A882] transition-all hover:scale-110">Instagram</a>
            <a href="https://www.x.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#C8A882] transition-all hover:scale-110">X</a>
          </div>
        </div>

        {/* Dreapta: Buton Back to Top - Mărit semnificativ */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="order-3 p-6 rounded-full border-2 border-white/10 hover:border-[#C8A882] text-white/50 hover:text-[#C8A882] transition-all hover:-translate-y-2"
          aria-label="Back to top"
        >
          <span className="text-4xl">↑</span>
        </button>
      </div>
    </footer>
  )
}