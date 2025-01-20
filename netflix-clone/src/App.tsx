import { useEffect, useState } from "react";
import "./App.css";
import { Carousel, Nav, VideoContainer } from "./components";
import { fetchMovieGenres } from "./services/fetchs";

interface Genero {
  id: number;
  name: string;
}

function App() {
  const [generos, setGeneros] = useState<Genero[]>([]);

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

  const ejemplo = {
    iso_639_1: "es",
    iso_3166_1: "ES",
    name: "Divertidísima",
    key: "ndri3rlCHHs",
    site: "YouTube",
    size: 1080,
    type: "Teaser",
    official: true,
    published_at: "2025-01-10T09:19:31.000Z",
    id: "67849e7978cfcd77ed4ed799",
  };

  return (
    <>
      <Nav></Nav>
      {/* <Banner/> */}

      <VideoContainer route={ejemplo.key} banner={true} />
      {generos && generos.length > 0 && (
        <>
          <Carousel genre_id={35} name={`Películas de ${generos[0].name}`} />
          <Carousel
            genre_id={generos[1].id}
            name={`Películas de ${generos[1].name}`}
          />
          <Carousel
            genre_id={generos[2].id}
            name={`Películas de ${generos[2].name}`}
          />
          <Carousel
            genre_id={generos[3].id}
            name={`Películas de ${generos[3].name}`}
          />
          <Carousel
            genre_id={generos[4].id}
            name={`Películas de ${generos[4].name}`}
          />
          <Carousel
            genre_id={generos[5].id}
            name={`Películas de ${generos[5].name}`}
          />
          <Carousel
            genre_id={generos[6].id}
            name={`Películas de ${generos[6].name}`}
          />
          <Carousel
            genre_id={generos[7].id}
            name={`Películas de ${generos[7].name}`}
          />
        </>
      )}
    </>
  );
}

export default App;
