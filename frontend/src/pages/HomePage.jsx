import { useEffect, useState } from 'react'
import { fetchHome, fetchCategorii, fetchFeatured, fetchTestimoniale, fetchBanner } from '../api/strapi'

import BannerPromo      from '../components/home/BannerPromo'
import HeroSection      from '../components/home/HeroSection'
import IntroSection     from '../components/home/IntroSection'
import CategoriiSection from '../components/home/CategoriiSection'
import FeaturedProducts from '../components/home/FeaturedProducts' // Păstrăm produsele cerute de profesor
import Testimoniale     from '../components/home/Testimoniale'
import Newsletter       from '../components/home/Newsletter'

export default function HomePage() {
  const [home, setHome]                 = useState(null)
  const [categorii, setCategorii]       = useState([])
  const [produse, setProduse]           = useState([])
  const [testimoniale, setTestimoniale] = useState([])
  const [banner, setBanner]             = useState(null)

  useEffect(() => {
    fetchHome().then(r         => setHome(r.data.data)).catch(console.error)
    fetchCategorii().then(r    => setCategorii(r.data.data)).catch(console.error)
    fetchFeatured().then(r     => setProduse(r.data.data)).catch(console.error)
    fetchTestimoniale().then(r => setTestimoniale(r.data.data)).catch(console.error)
    fetchBanner().then(r       => setBanner(r.data.data)).catch(console.error)
  }, [])

  return (
    <main className="bg-cream font-sans min-h-screen flex flex-col justify-between">
      <div className="w-full">
        {/* 1. Banner Promoțional */}
        {banner?.IsActiv && <BannerPromo data={banner} />}
        
        {/* 2. Secțiunea Hero */}
        <HeroSection data={home} />
        
        {/* 3. Secțiunea Introducere */}
        <IntroSection data={home} />
        
        {/* 4. Secțiunea Categorii */}
        <CategoriiSection data={categorii} />
        
        {/* 5. PRODUSE RECOMANDATE (Cerute de profesor) */}
        {/* Le izolăm într-un container block curat ca să nu mai strice restul paginii */}
        <div className="block w-full clear-both my-12">
          <FeaturedProducts data={produse} />
        </div>
        
        {/* 6. Secțiunea Testimoniale (Recenzii) */}
        <div className="block w-full clear-both my-12">
          <Testimoniale data={testimoniale} />
        </div>
        
        {/* 7. Secțiunea Newsletter */}
        <Newsletter />
      </div>

      {/* 8. FOOTER (Subsolul paginii) */}
      <footer className="bg-gray-100 dark:bg-gray-800 py-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 w-full block mt-auto">
        <p>&copy; {new Date().getFullYear()} Flori - Toate drepturile rezervate.</p>
      </footer>
    </main>
  )
}