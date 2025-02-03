import { createContext, useContext } from "react";

interface Genero {
  id: number;
  name: string;
}

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

interface GlobalContextType {
  generos: Genero[];
  setGeneros: React.Dispatch<React.SetStateAction<Genero[]>>;
  showHover: boolean;
  setShowHover: React.Dispatch<React.SetStateAction<boolean>>;
  moviePicked: Movie;
  setMoviePicked: React.Dispatch<React.SetStateAction<Movie>>;
  loading: boolean;
}

const defaultMovie = {
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
  }

export const GlobalContext = createContext<GlobalContextType>({
  generos: [],
  setGeneros: () => {},
  loading: true,
  showHover: false,
  setShowHover: () => {},
  moviePicked: defaultMovie,
  setMoviePicked: () => {},
});

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  console.log("en el context: ", context);
  if (!context) {
    throw new Error("Error en el context");
  }

  return context;
};
