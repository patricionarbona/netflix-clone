interface Genero {
    id: number;
    name: string;
  }
  
  interface GenerosMovies {
    genres: Genero[];
  }

const claveApi = import.meta.env.VITE_API_KEY

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${claveApi}`
    }
}

const URL_MOVIE_GENRES = 'https://api.themoviedb.org/3/genre/movie/list'

export const fetchPages = async <T>(url: string, params: URLSearchParams, numPages= 1): Promise<T[]> => {
    const newUrl = new URL(url)
    const newParams = new URLSearchParams(params)

    const fetchPromises = Array.from({length: numPages}, (_,page) => {
        newParams.set('page', String(page + 1))
        newUrl.search = newParams.toString()
        return fetch(newUrl, options)
            .then(response => {
                if(!response.ok) {
                    throw new Error(`Error en la petición de la pagina: ${page + 1}`)
                }
                return response.json()
            })
    })

    try {
        const results = await Promise.all(fetchPromises)
        return results.flat()
    } catch (er) {
        console.error('error en las peticiones', er)
        throw er
    }
} 

export const fetchMovieGenres = async (language = 'es'): Promise<Genero[]> => {
    const url = new URL(URL_MOVIE_GENRES)
    const params = new URLSearchParams({
        'language': language
    })
    url.search = params.toString()
    try {
        const response = await fetch(url,options)
        if(!response.ok) {
            throw new Error('Error peticion generos')
        }
        const data: GenerosMovies = await response.json()
        return data.genres
    } catch(er) {
        console.error('Error al obtener los generos', er)
        throw er
    }
} 