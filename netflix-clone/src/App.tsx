import { useEffect, useState } from 'react'
import './App.css'
import { Banner, Carousel, Nav } from "./components"
import { fetchMovieGenres } from './services/fetchs'

interface Genero {
  id: number;
  name: string;
}

function App() {
  const [generos, setGeneros] = useState<Genero[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMovieGenres();
        setGeneros(data);
      } catch (error) {
        console.error("Error al obtener géneros:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    {/* <Nav></Nav> */}
    {/* <Banner/> */}

    {/* {generos && generos.map(genero =>(
      <Carousel key={genero.id} genre_id={genero.id} />
    ))} */}

    <Carousel genre_id={35} name='Acción' />
    </>
  )
}

export default App
