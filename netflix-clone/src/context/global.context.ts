import { createContext, useContext } from "react"

interface Genero {
    id: number;
    name: string;
  }

interface GlobalContextType {
    generos: Genero[];
    setGeneros: React.Dispatch<React.SetStateAction<Genero[]>>;
    loading: boolean;
  }



  export const GlobalContext = createContext<GlobalContextType>({
    generos: [],
    setGeneros: () => {},
    loading: true
  });
  

export const useGlobalContext = () => {
    const context = useContext(GlobalContext)
    
    console.log('en el context: ', context)
    if(!context) {
        throw new Error('Error en el context')
    }
  
    return context
  }