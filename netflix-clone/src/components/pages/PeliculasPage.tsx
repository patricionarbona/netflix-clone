import { useGlobalContext } from "../../context/global.context";
import { Banner } from "../Banner/Banner";
import { Carousel } from "../Carousel/Carousel";

export const PeliculasPage = () => {
  const { generos } = useGlobalContext();

  return (
    <>
      <Banner />
      <div className="container-carousels">
        {generos &&
          generos.movies.map((genero, index) => (
            <Carousel
              key={`movies-${index}-${genero.name}`}
              genre_id={genero.id}
              textHeader={`Películas ${
                index !== 0 && index % 3 === 0 ? "populares" : ""
              } de ${genero.name}`}
              isSerie={false}
              isPopular={index !== 0 && index % 3 === 0}
            />
          ))}
      </div>
    </>
  );
};
