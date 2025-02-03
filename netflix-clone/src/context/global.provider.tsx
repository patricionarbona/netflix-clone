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
  const [loading, setLoading] = useState<boolean>(true);
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

  return (
    <GlobalContext.Provider value={{ generos, setGeneros, loading }}>
      {children}
    </GlobalContext.Provider>
  );
};
