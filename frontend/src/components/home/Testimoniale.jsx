export default function Testimoniale({ data }) {
  if (!data?.length) return null

  return (
    <section className="py-24 px-6 bg-white">
      <div className="mx-auto text-center w-full">

        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-[#C8A882]" />
            <span className="text-[#C8A882] text-xs tracking-[0.3em] uppercase">
              Recenzii Clienti
            </span>
            <div className="h-px w-12 bg-[#C8A882]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ce Spun Clientii Nostri
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((item) => (
            <div key={item.id} className="bg-[#FAF7F2] p-8 flex flex-col gap-4">

              <div className="flex gap-1">
                {Array.from({ length: item.Rating || 5 }).map((_, i) => (
                  <span key={i} className="text-[#C8A882] text-sm">★</span>
                ))}
              </div>

              <p className="text-[#6b6375] text-sm font-light leading-relaxed italic">
                "{item.Mesaj}"
              </p>

              <div className="mt-auto pt-4 border-t border-[#e5e4e7]">
                <p className="text-[#1A1A1A] font-medium text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {item.Nume}
                </p>
                {item.Oras && (
                  <p className="text-[#C8A882] text-xs tracking-wider uppercase mt-1">
                    {item.Oras}
                  </p>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}