import { getImageUrl } from '../../api/strapi'

export default function HeroSection({ data }) {
  // După fixul din HomePage, data conține deja attributes aplatizate
  // ImagineHero vine ca { data: { id, attributes: { url, ... } } }
  const imageUrl = getImageUrl(data?.ImagineHero)

  const handleNavigation = (href) => {
    window.location.href = href
  }

  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-rose-200 via-pink-100 to-stone-200" />
      )}

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-16 bg-white/60" />
          <span className="text-xs tracking-[0.3em] uppercase opacity-80">
            Florărie de Lux
          </span>
          <div className="h-px w-16 bg-white/60" />
        </div>

        <h1
          className="text-5xl md:text-7xl font-serif font-semibold leading-tight mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {data?.Titlu || 'Flori care spun ce cuvintele nu pot'}
        </h1>

        <p className="text-lg md:text-xl font-light tracking-wide opacity-90 mb-10 w-full text-center">
          {data?.Subtitlu || 'Aranjamente florale de lux, create cu pasiune'}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
          <button
            onClick={() => handleNavigation(data?.LinkButonHero || '/produse')}
            className="px-10 py-4 text-sm tracking-widest uppercase font-medium transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: '#C8A882', color: 'white' }}
          >
            {data?.TextButonHero || 'Descopera Colectia'}
          </button>

          <button
            onClick={() => handleNavigation('/despre')}
            className="px-10 py-4 text-sm tracking-widest uppercase font-medium border border-white/70 text-white hover:bg-white/10 transition-all duration-300"
          >
            Povestea Noastra
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-white/40 animate-pulse" />
      </div>
    </section>
  )
}
