import { ReactNode, useEffect, useState } from "react";
import { fetchMovieGenres, fetchTVGenres } from "../services/fetchs";
import { GlobalContext } from "./global.context";
import { Genero, Movie, TVShow } from "../interfaces";

interface GlobalProviderProps {
  children: ReactNode;
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
  const [generos, setGeneros] = useState<{ movies: Genero[]; tv: Genero[] }>({
    movies: [],
    tv: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [clientWidth, setClientWidth] = useState(0);
  const [showHover, setShowHover] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentPicked, setContentPicked] = useState<Movie | TVShow>(
    defaultMovie
  );
  const [contentPickedPos, setContentPickedPos] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMovieGenres();
        const dataSeries = await fetchTVGenres();
        setGeneros({
          movies: data,
          tv: dataSeries,
        });
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
    let resizeTimer: number;
    let isMouseDown = false;
  
    const handleResize = () => {
      setIsResizing(true);
      setClientWidth(window.innerWidth);
  
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setIsResizing(false);
      }, 300);
    };
  
    const handleMouseDown = (e: MouseEvent) => {
      const margin = 10; 
      if (
        e.clientX <= margin ||
        e.clientX >= window.innerWidth - margin
      ) {
        isMouseDown = true;
        setIsResizing(true);
      }
    };
  
    const handleMouseMove = () => {
      if (isMouseDown) {
        setClientWidth(window.innerWidth);
      }
    };
  
    const handleMouseUp = () => {
      isMouseDown = false;
      setIsResizing(false);
    };
  
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
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
        contentPicked,
        setContentPicked,
        contentPickedPos,
        setContentPickedPos,
        clientWidth,
        isResizing,
        setIsResizing,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
