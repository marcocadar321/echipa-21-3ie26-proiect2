import axios from 'axios'

const BASE = 'http://localhost:1337'

export const API = axios.create({ baseURL: `${BASE}/api` })

// Strapi v4: imaginile sunt în attributes.formats sau direct attributes.url
export const getImageUrl = (img) => {
  if (!img) return null
  // Dacă img vine direct din attributes (după ce ai extras deja)
  if (img.url) return `${BASE}${img.url}`
  // Dacă img vine din data.attributes (structura completă)
  if (img.data?.attributes?.url) return `${BASE}${img.data.attributes.url}`
  return null
}

// Helper: extrage attributes dintr-un obiect Strapi v4
export const getAttrs = (item) => item?.attributes || item || {}

export const fetchHome         = () => API.get('/home?populate=*')
export const fetchCategorii    = () => API.get('/categoriis?populate=*&sort=Ordine:asc')
export const fetchFeatured     = () => API.get('/produses?filters[IsFeatured][$eq]=true&populate=*&pagination[limit]=8')
export const fetchTestimoniale = () => API.get('/testimoniales?filters[IsVisible][$eq]=true&populate=*')
export const fetchBanner       = () => API.get('/banner-promo?populate=*')
export const fetchContact      = () => API.get('/contact?populate=*')