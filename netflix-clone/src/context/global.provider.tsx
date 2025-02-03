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


export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [generos, setGeneros] = useState<Genero[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMovieGenres();
        setGeneros(data);
        console.log(data);
      } catch (error) {
        console.error("Error al obtener géneros:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <GlobalContext.Provider value={{ generos, setGeneros }}>
      {children}
    </GlobalContext.Provider>
  );
};