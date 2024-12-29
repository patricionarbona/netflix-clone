import { useEffect, useState } from "react"
import { fetchPages } from "../../services/fetchs"

interface Movie {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

interface FetchMovies {
    page: number
    results: Movie[]
}

const urlGenre = 'https://api.themoviedb.org/3/discover/movie'
const urlPoster = 'https://image.tmdb.org/t/p/original/'


const paramsLanguage = new URLSearchParams({
    language: 'es-ES',
    sort_by: 'popularity.desc'
})

export const Carousel = ({genre_id}: {genre_id:number}) => {
    const [movies, setMovies] = useState<FetchMovies[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        paramsLanguage.append('with_genres', String(genre_id))
        paramsLanguage.append('primary_release_date.gte', '2024-01-01');
        paramsLanguage.append('primary_release_date.lte', '2024-12-31');

        const fetchData = async () => {
            try {
                const data = await fetchPages<FetchMovies>(urlGenre, paramsLanguage, 2)
                setMovies(data)
                setLoading(false)
            } catch (error) {
                setError(`Error al cargar las peliculas: ${error}`)
            } finally {
                setLoading(false)
            }   
        }

        fetchData()

    }, [genre_id])

    if(loading) {return <div>Loading...</div>}
    if(error) {return <div>{error}</div>}

    return(
        <div>
            {movies && movies.map(movieResponse => (
                movieResponse.results.map(movie => (
                <img key={movie.id} src={`${urlPoster + movie.poster_path}`} alt={movie.title} />
                ))
            ))}
        </div>
)} 