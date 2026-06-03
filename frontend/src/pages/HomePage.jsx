import { useEffect, useState } from 'react'
import { fetchHome, fetchCategorii, fetchFeatured, fetchTestimoniale, fetchBanner } from '../api/strapi'

import BannerPromo      from '../components/home/BannerPromo'
import HeroSection      from '../components/home/HeroSection'
import IntroSection     from '../components/home/IntroSection'
import CategoriiSection from '../components/home/CategoriiSection'
import FeaturedProducts from '../components/home/FeaturedProducts'
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
    <main className="bg-cream font-sans">
      {banner?.IsActiv && <BannerPromo data={banner} />}
      <HeroSection data={home} />
      <IntroSection data={home} />
      <CategoriiSection data={categorii} />
      <FeaturedProducts data={produse} />
      <Testimoniale data={testimoniale} />
      <Newsletter />
    </main>
  )
}