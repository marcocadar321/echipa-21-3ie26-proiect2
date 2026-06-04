import { getImageUrl } from '../../api/strapi'

export default function FeaturedProducts({ data }) {
  if (!data?.length) return null
  return (
    <section className="py-24 px-6 bg-[#FAF7F2]">
      <div className="mx-auto text-center w-full">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-[#C8A882]" />
            <span className="text-[#C8A882] text-xs tracking-[0.3em] uppercase">
              Selectie Premium
            </span>
            <div className="h-px w-12 bg-[#C8A882]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Produse Recomandate
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((produs) => {
            const img = getImageUrl(produs.Imagine)
            return (
              <div key={produs.id} className="group bg-white overflow-hidden">
                <div className="relative h-72 overflow-hidden">
                  {img ? (
                    <img src={img} alt={produs.Nume} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-rose-100 to-pink-50" />
                  )}
                  {produs.Eticheta && (
                    <span className="absolute top-4 left-4 px-3 py-1 text-xs tracking-widest uppercase text-white" style={{ backgroundColor: '#C8A882' }}>
                      {produs.Eticheta}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {produs.Nume}
                  </h3>
                  <p className="text-sm text-[#6b6375] font-light mb-4 line-clamp-2">
                    {produs.Descriere}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-semibold text-[#1A1A1A]">
                        {produs.Pret} RON
                      </span>
                      {produs.PretVechi && (
                        <span className="text-sm text-[#6b6375] line-through">
                          {produs.PretVechi} RON
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    className="w-full mt-4 py-3 text-xs tracking-widest uppercase text-white transition-all duration-300 hover:opacity-80"
                    style={{ backgroundColor: '#1A1A1A' }}
                  >
                    Adauga in Cos
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}