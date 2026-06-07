import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [trimis, setTrimis] = useState(false)

  function handleSubmit() {
    if (!email) return
    setTrimis(true)
    setEmail('')
  }

  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#1A1A1A' }}>
      <div className="max-w-2xl mx-auto text-left">

        <div className="flex items-left gap-4 mb-6">
          <div className="h-px w-12 bg-[#C8A882]" />
          <span className="text-[#C8A882] text-xs tracking-[0.3em] uppercase">
            Newsletter
          </span>
          <div className="h-px w-12 bg-[#C8A882]" />
        </div>

        <h2 className="text-4xl font-semibold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          Fii Prima Care Afla
        </h2>

        <p className="text-white/60 font-light mb-10 leading-relaxed">
          Aboneaza-te si primesti oferte exclusive, noutati si inspiratie florala direct in inbox.
        </p>

        {trimis ? (
          <div className="text-[#C8A882] tracking-widest uppercase text-sm">
            Multumim! Te-ai abonat cu succes.
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="adresa@email.com"
              className="flex-1 px-6 py-4 bg-white/10 text-white placeholder-white/40 text-sm outline-none border border-white/20 focus:border-[#C8A882] transition-colors"
            />
            <button
              onClick={handleSubmit}
              className="px-8 py-4 text-xs tracking-widest uppercase text-white font-medium transition-opacity hover:opacity-80"
              style={{ backgroundColor: '#C8A882' }}
            >
              Aboneaza-te
            </button>
          </div>
        )}

      </div>
    </section>
  )
}