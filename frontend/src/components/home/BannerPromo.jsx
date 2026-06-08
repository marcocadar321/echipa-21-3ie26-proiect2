import { Link } from 'react-router-dom'

export default function BannerPromo({ data }) {
  if (!data) return null

  return (
    /* Am pus bg-rose-400 (un roz superb de flori), text alb și umbră discretă */
    <div className="w-full bg-rose-400 text-white py-3 px-4 text-xs md:text-sm font-medium tracking-wider uppercase shadow-sm transition-all duration-300">
      
      {/* Container care aliniaza totul perfect pe centru. Pe mobil le pune unele sub altele, pe desktop pe același rând */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
        
        {/* Textul din banner */}
        <span className="opacity-95">
          {data.TextBanner || "Reduceri speciale în această perioadă!"}
        </span>

        {/* Butonul stilizat complet cu Tailwind (pastilă albă, text închis, efect la hover) */}
        {data.TextButon && (
          <Link
            to={data.LinkButon || '/'}
            className="inline-block bg-white text-rose-500 font-bold px-4 py-1 text-[11px] rounded-full hover:bg-rose-50 hover:scale-105 transition-all duration-200 shadow-sm normal-case first-letter:uppercase tracking-normal"
          >
            {data.TextButon}
          </Link>
        )}
        
      </div>
    </div>
  )
}