import { createContext, useContext } from "react";
import { TVShow } from "../interfaces";

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
  generos: { movies: Genero[]; tv: Genero[] };
  setGeneros: React.Dispatch<
    React.SetStateAction<{ movies: Genero[]; tv: Genero[] }>
  >;
  showHover: boolean;
  setShowHover: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  isResizing: boolean;
  setIsResizing: React.Dispatch<React.SetStateAction<boolean>>;
  contentPicked: Movie | TVShow;
  setContentPicked: React.Dispatch<React.SetStateAction<Movie | TVShow>>;
  contentPickedPos: { x: number; y: number; width: number; height: number };
  setContentPickedPos: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
      width: number;
      height: number;
    }>
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
  generos: {
    movies: [],
    tv: [],
  },
  setGeneros: () => {},
  loading: true,
  showHover: false,
  setShowHover: () => {},
  isModalOpen: false,
  setIsModalOpen: () => {},
  isResizing: false,
  setIsResizing: () => {},
  query: "",
  setQuery: () => {},
  contentPicked: defaultMovie,
  setContentPicked: () => {},
  contentPickedPos: { x: 0, y: 0, width: 0, height: 0 },
  setContentPickedPos: () => {},
  clientWidth: 0,
});

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("Error en el context");
  }

  return context;
};
