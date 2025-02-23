import { ReactNode, useEffect, useState } from "react";
import { fetchMovieGenres } from "../services/fetchs";
import { GlobalContext } from "./global.context";

interface GlobalProviderProps {
  children: ReactNode;
}

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

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [clientWidth, setClientWidth] = useState(0);
  const [showHover, setShowHover] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [moviePicked, setMoviePicked] = useState<Movie>(defaultMovie);
  const [moviePickedPos, setMoviePickedPos] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMovieGenres();
        setGeneros(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener géneros:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsResizing(clientWidth !== window.innerWidth);
      setClientWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        generos,
        setGeneros,
        loading,
        showHover,
        setShowHover,
        isModalOpen,
        setIsModalOpen,
        moviePicked,
        setMoviePicked,
        moviePickedPos,
        setMoviePickedPos,
        clientWidth,
        isResizing,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
