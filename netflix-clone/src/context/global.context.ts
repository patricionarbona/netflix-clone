import { createContext, useContext } from "react"

interface Genero {
    id: number;
    name: string;
  }

interface GlobalContextType {
    generos: Genero[];
    setGeneros: React.Dispatch<React.SetStateAction<Genero[]>>;
  }



  export const GlobalContext = createContext<GlobalContextType>({
    generos: [],
    setGeneros: () => {}
  });
  

export const useGlobalContext = () => {
    const context = useContext(GlobalContext)
    
    
  
    return context
  }