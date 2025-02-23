import { createContext, useContext } from "react";

interface Genero {
  id: number;
  name: string;
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

interface GlobalContextType {
  generos: Genero[];
  setGeneros: React.Dispatch<React.SetStateAction<Genero[]>>;
  showHover: boolean;
  setShowHover: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isResizing: boolean;
  setIsResizing: React.Dispatch<React.SetStateAction<boolean>>;
  moviePicked: Movie;
  setMoviePicked: React.Dispatch<React.SetStateAction<Movie | null>>;
  moviePickedPos: { x: number; y: number };
  setMoviePickedPos: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }>
  >;
  loading: boolean;
  clientWidth: number;
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
};

export const GlobalContext = createContext<GlobalContextType>({
  generos: [],
  setGeneros: () => {},
  loading: true,
  showHover: false,
  setShowHover: () => {},
  isModalOpen: false,
  setIsModalOpen: () => {},
  isResizing: false,
  setIsResizing: () => {},
  moviePicked: defaultMovie,
  setMoviePicked: () => {},
  moviePickedPos: { x: 0, y: 0 },
  setMoviePickedPos: () => {},
  clientWidth: 0,
});

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("Error en el context");
  }

  return context;
};
