export default function IntroSection({ data }) {
  return (
    <section className="py-24 px-6 bg-[#FAF7F2]">
      <div className="mx-auto text-center w-full">

        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-12 bg-[#C8A882]"></div>
          <span className="text-[#C8A882] text-xs tracking-[0.3em] uppercase">
            Povestea Noastră
          </span>
          <div className="h-px w-12 bg-[#C8A882]"></div>
        </div>

        <h2
          className="text-4xl md:text-5xl font-semibold text-[#1A1A1A] mb-8 leading-tight text-center"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Frumusețea naturii, <br />
          <em className="font-normal">livrată cu eleganță</em>
        </h2>

        <p className="text-[#6b6375] text-lg font-light leading-relaxed mb-12 text-center">
          {typeof data?.TextIntroductiv === 'string'
            ? data.TextIntroductiv
            : 'De peste 10 ani, aducem frumusețea naturii în cele mai speciale momente ale vieții tale.'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
          {[
            { icon: '🌸', titlu: 'Flori Proaspete', text: 'Selecționate zilnic din cele mai bune surse' },
            { icon: '✂️', titlu: 'Create Manual', text: 'Fiecare aranjament este unic, făcut cu pasiune' },
            { icon: '🚗', titlu: 'Livrare Rapidă', text: 'Livrăm cu grijă direct la ușa ta' },
          ].map((item) => (
            <div key={item.titlu} className="flex flex-col items-center gap-3 text-center">
              <span className="text-4xl">{item.icon}</span>
              <h3
                className="text-lg font-semibold text-[#1A1A1A] text-center"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {item.titlu}
              </h3>
              <p className="text-[#6b6375] text-sm font-light leading-relaxed text-center">
                {item.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}