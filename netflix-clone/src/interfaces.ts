export interface Movie {
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

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const defaultMovie = {
  adult: false,
  backdrop_path: "",
  genre_ids: [],
  id: 0,
  original_language: "",
  original_title: "",
  overview: "",
  popularity: 0,
  poster_path: "",
  release_date: "",
  title: "",
  video: false,
  vote_average: 0,
  vote_count: 0,
};

export interface VideoMovie {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface ButtonCircleProps {
  addClass?: string;
  showTooltip?: boolean;
  textTooltip: string;
  svgProp: React.ReactNode;
  onClick?: () => void;
}

export interface TVShow {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
}

export interface TVResponse {
  page: number;
  results: TVShow[];
  total_pages: number;
  total_results: number;
}

export interface Genero {
  id: number;
  name: string;
}

export interface Media {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  
  // Propiedades específicas de Movie
  original_title?: string;
  title?: string;
  release_date?: string;
  video?: boolean;

  // Propiedades específicas de TVShow
  original_name?: string;
  name?: string;
  first_air_date?: string;
  origin_country?: string[];
}
