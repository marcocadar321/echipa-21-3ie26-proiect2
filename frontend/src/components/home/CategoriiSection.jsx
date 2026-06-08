import { getImageUrl } from '../../api/strapi'

export default function CategoriiSection({ data }) {
  if (!data?.length) return null

  return (
    <section className="py-24 px-6 bg-white">
      <div className="mx-auto text-center w-full">

        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-[#C8A882]"></div>
            <span className="text-[#C8A882] text-xs tracking-[0.3em] uppercase">
              Colectiile Noastre
            </span>
            <div className="h-px w-12 bg-[#C8A882]"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Exploreaza Categoriile
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((cat) => {
            const img = getImageUrl(cat.Imagine)
            return (
              <div key={cat.id} className="group relative overflow-hidden cursor-pointer block h-96">
                {img ? (
                  <img src={img} alt={cat.Nume} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-rose-100 to-pink-50"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white text-center">
                  <h3 className="text-2xl font-semibold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {cat.Nume}
                  </h3>
                  <p className="text-sm font-light opacity-80 leading-relaxed">
                    {cat.Descriere}
                  </p>
                  <div className="mt-4 text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Descopera
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
