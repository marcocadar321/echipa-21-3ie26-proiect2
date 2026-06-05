import axios from 'axios'

const BASE = 'http://localhost:1337'

export const API = axios.create({ baseURL: `${BASE}/api` })

export const getImageUrl = (img) =>
  img?.url ? `${BASE}${img.url}` : null

export const fetchHome         = () => API.get('/home?populate=*')
export const fetchCategorii    = () => API.get('/categoriis?populate=*&sort=Ordine:asc')
export const fetchFeatured     = () => API.get('/produses?filters[IsFeatured][$eq]=true&populate=*&pagination[limit]=8')
export const fetchTestimoniale = () => API.get('/testimoniales?filters[IsVisible][$eq]=true&populate=*')
export const fetchBanner       = () => API.get('/banner-promo')