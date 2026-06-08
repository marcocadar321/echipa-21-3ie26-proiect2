import { useEffect, useState } from 'react'
import { fetchHome, fetchCategorii, fetchFeatured, fetchTestimoniale, fetchBanner } from '../api/strapi'

import BannerPromo      from '../components/home/BannerPromo'
import HeroSection      from '../components/home/HeroSection'
import IntroSection     from '../components/home/IntroSection'
import CategoriiSection from '../components/home/CategoriiSection'
import FeaturedProducts from '../components/home/FeaturedProducts'
import Testimoniale     from '../components/home/Testimoniale'
import Newsletter       from '../components/home/Newsletter'
import Footer from '../components/layout/Footer'
export default function HomePage() {
  const [home, setHome]                 = useState(null)
  const [categorii, setCategorii]       = useState([])
  const [produse, setProduse]           = useState([])
  const [testimoniale, setTestimoniale] = useState([])
  const [banner, setBanner]             = useState(null)

  useEffect(() => {
    // Single types (home, banner-promo): r.data.data este obiectul direct
    // Trebuie să extragem .attributes din el
    fetchHome()
      .then(r => {
        const raw = r.data.data
        // Strapi v4: datele sunt în .attributes
        setHome(raw?.attributes || raw)
      })
      .catch(console.error)

    fetchBanner()
      .then(r => {
        const raw = r.data.data
        setBanner(raw?.attributes || raw)
      })
      .catch(console.error)

    // Collection types: r.data.data este un array, fiecare item are .attributes
    fetchCategorii()
      .then(r => {
        const raw = r.data.data || []
        setCategorii(raw.map(item => ({ id: item.id, ...( item.attributes || item) })))
      })
      .catch(console.error)

    fetchFeatured()
      .then(r => {
        const raw = r.data.data || []
        setProduse(raw.map(item => ({ id: item.id, ...(item.attributes || item) })))
      })
      .catch(console.error)

    fetchTestimoniale()
      .then(r => {
        const raw = r.data.data || []
        setTestimoniale(raw.map(item => ({ id: item.id, ...(item.attributes || item) })))
      })
      .catch(console.error)
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

        {/* 5. Produse recomandate */}
        <div className="block w-full clear-both my-12">
          <FeaturedProducts data={produse} />
        </div>

        {/* 6. Testimoniale */}
        <div className="block w-full clear-both my-12">
          <Testimoniale data={testimoniale} />
        </div>

        {/* 7. Newsletter */}
        <Newsletter />
      </div>

      <Footer />
    </main>
  )
}
