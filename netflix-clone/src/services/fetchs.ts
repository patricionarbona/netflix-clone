import { MovieResponse, TVShow } from "../interfaces";

interface Genero {
  id: number;
  name: string;
}

interface GenerosMovies {
  genres: Genero[];
}

interface VideoMovie {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  published_at: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  id: string;
}
interface VideosMovie {
  id: number;
  results: VideoMovie[];
}

interface CastMovie {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

interface CrewMovie {
  adult: boolean;
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}

interface CastsMovie {
  id: number;
  cast: CastMovie[];
  crew: CrewMovie[];
}

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface MovieSimilar {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface TVSimilar {
  page: number;
  results: TVShow[];
  total_pages: number;
  total_results: number;
}

interface MoviePopular {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const claveApi = import.meta.env.VITE_API_KEY;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${claveApi}`,
  },
};

const URL_MOVIE_GENRES = "https://api.themoviedb.org/3/genre/movie/list";
const URL_TV_GENRES = "https://api.themoviedb.org/3/genre/tv/list";

export const fetchPages = async <T>(
  url: string,
  params: URLSearchParams,
  numPages = 1
): Promise<T[]> => {
  const newUrl = new URL(url);
  const newParams = new URLSearchParams(params);

  const fetchPromises = Array.from({ length: numPages }, (_, page) => {
    newParams.set("page", String(page + 1));
    newUrl.search = newParams.toString();
    return fetch(newUrl, options).then((response) => {
      if (!response.ok) {
        throw new Error(`Error en la petición de la pagina: ${page + 1}`);
      }
      return response.json();
    });
  });

  try {
    const results = await Promise.all(fetchPromises);
    return results.flat();
  } catch (er) {
    console.error("error en las peticiones", er);
    throw er;
  }
};

export const fetchMovieGenres = async (language = "es"): Promise<Genero[]> => {
  const url = new URL(URL_MOVIE_GENRES);
  const params = new URLSearchParams({
    language: language,
  });
  url.search = params.toString();
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Error peticion generos");
    }
    const data: GenerosMovies = await response.json();
    return data.genres;
  } catch (er) {
    console.error("Error al obtener los generos", er);
    throw er;
  }
};

export const fetchTVGenres = async (language = "es"): Promise<Genero[]> => {
  const url = new URL(URL_TV_GENRES);
  const params = new URLSearchParams({
    language: language,
  });
  url.search = params.toString();
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Error peticion generos");
    }
    const data: GenerosMovies = await response.json();
    return data.genres;
  } catch (er) {
    console.error("Error al obtener los generos", er);
    throw er;
  }
};

export const fetchMovieVideos = async (
  idMovie: number,
  language = "es"
): Promise<VideoMovie[]> => {
  const url = `https://api.themoviedb.org/3/movie/${idMovie}/videos?language=${language}`;

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Error peticion videos movies");
    }
    const data: VideosMovie = await response.json();
    return data.results;
  } catch (er) {
    console.error("Error al obtener los videos de movies", er);
    throw er;
  }
};

export const fetchTVVideos = async (
  idMovie: number,
  language = "es"
): Promise<VideoMovie[]> => {
  const url = `https://api.themoviedb.org/3/tv/${idMovie}/videos?language=${language}`;

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Error peticion videos tv");
    }
    const data: VideosMovie = await response.json();
    return data.results;
  } catch (er) {
    console.error("Error al obtener los videos de tv", er);
    throw er;
  }
};

export const fetchMovieCast = async (
  idMovie: number,
  language = "es"
): Promise<{ cast: CastMovie[]; crew: CrewMovie[] }> => {
  const url = `https://api.themoviedb.org/3/movie/${idMovie}/credits?language=${language}`;

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Error peticion videos movies");
    }
    const data: CastsMovie = await response.json();
    return {
      cast: data.cast,
      crew: data.crew,
    };
  } catch (er) {
    console.error("Error al obtener los videos de movies", er);
    throw er;
  }
};

export const fetchTVCast = async (
  idMovie: number,
  language = "es"
): Promise<{ cast: CastMovie[]; crew: CrewMovie[] }> => {
  const url = `https://api.themoviedb.org/3/tv/${idMovie}/credits?language=${language}`;

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Error peticion videos movies");
    }
    const data: CastsMovie = await response.json();
    return {
      cast: data.cast,
      crew: data.crew,
    };
  } catch (er) {
    console.error("Error al obtener los videos de movies", er);
    throw er;
  }
};

export const fetchMovieSimilar = async (
  idMovie: number,
  language = "es"
): Promise<Movie[]> => {
  const url = `https://api.themoviedb.org/3/movie/${idMovie}/similar?language=${language}`;

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Error peticion similar movies");
    }
    const data: MovieSimilar = await response.json();
    return data.results;
  } catch (er) {
    console.error("Error al obtener los videos de movies", er);
    throw er;
  }
};

export const fetchTVSimilar = async (
  idMovie: number,
  language = "es"
): Promise<TVShow[]> => {
  const url = `https://api.themoviedb.org/3/tv/${idMovie}/similar?language=${language}`;

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Error peticion similar movies");
    }
    const data: TVSimilar = await response.json();
    return data.results;
  } catch (er) {
    console.error("Error al obtener los videos de movies", er);
    throw er;
  }
};

export const fetchMoviePopular = async (): Promise<Movie> => {
  const paramsLanguage = new URLSearchParams({
    language: "es-ES",
    sort_by: "popularity.desc",
  });

  const today = new Date();
  const lastYear = new Date();
  lastYear.setFullYear(today.getFullYear() - 1);

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  paramsLanguage.append("primary_release_date.gte", formatDate(lastYear));
  paramsLanguage.append("primary_release_date.lte", formatDate(today));

  const url = new URL("https://api.themoviedb.org/3/movie/popular");
  url.search = paramsLanguage.toString();

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Error peticion movies popular");
    }
    const data: MoviePopular = await response.json();
    return data.results[0];
  } catch (er) {
    console.error("Error al obtener la pelicula más popular", er);
    throw er;
  }
};


export const fetchMovieByName = async (nameQuery: string): Promise<Movie[]> => {
  const paramsFetch = new URLSearchParams({
    language: "es-ES",
    sort_by: "popularity.desc",
    query: nameQuery,
  });

  const url = new URL('https://api.themoviedb.org/3/search/tv')
  url.search = paramsFetch.toString()

  try {
    const response = await fetch(url, options)
    if(!response.ok) {
      throw new Error('Error peticion movie by name')
    }
    const data: MovieResponse = await response.json()
    return data.results
  } catch (er) {
    console.error("Error al obtener la pelicula por su nombre", er)
    throw er
  }
};

export const fetchTVByName = async (nameQuery: string): Promise<Movie[]> => {
  const paramsFetch = new URLSearchParams({
    language: "es-ES",
    sort_by: "popularity.desc",
    query: nameQuery,
  });

  const url = new URL('https://api.themoviedb.org/3/search/tv')
  url.search = paramsFetch.toString()

  try {
    const response = await fetch(url, options)
    if(!response.ok) {
      throw new Error('Error peticion tv by name')
    }
    const data: MovieResponse = await response.json()
    return data.results
  } catch (er) {
    console.error("Error al obtener el show por su nombre", er)
    throw er
  }
};