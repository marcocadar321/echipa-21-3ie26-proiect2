import axios from 'axios'
<<<<<<< HEAD
 
const BASE = 'http://localhost:1337'
 
export const API = axios.create({ baseURL: `${BASE}/api` })
 
export const getImageUrl = (img) =>
  img?.url ? `${BASE}${img.url}` : null
 
export const fetchHome         = () => API.get('/home?populate=*')
export const fetchCategorii    = () => API.get('/categorii?populate=*&sort=Ordine:asc')
export const fetchFeatured     = () => API.get('/produses?filters[IsFeatured][$eq]=true&populate=*&pagination[limit]=8')
export const fetchTestimoniale = () => API.get('/testimoniales?filters[IsVisible][$eq]=true&populate=*')
export const fetchBanner       = () => API.get('/banner-promo')
 
// ✅ FIX: un singur populate=* (include automat toate relațiile)
export const fetchProduse      = () => API.get('/produses?populate=*')
 
=======

const BASE = 'http://localhost:1337'

export const API = axios.create({ baseURL: `${BASE}/api` })

export const getImageUrl = (img) =>
  img?.url ? `${BASE}${img.url}` : null

export const fetchHome         = () => API.get('/home?populate=*')
export const fetchCategorii    = () => API.get('/categoriis?populate=*&sort=Ordine:asc')
export const fetchFeatured     = () => API.get('/produses?filters[IsFeatured][$eq]=true&populate=*&pagination[limit]=8')
export const fetchTestimoniale = () => API.get('/testimoniales?filters[IsVisible][$eq]=true&populate=*')
export const fetchBanner       = () => API.get('/banner-promo')
>>>>>>> bb65becd091ccb4950c792343e55c8cb84d8633c
