import { useGlobalContext } from "../../context/global.context";
import { Banner } from "../Banner/Banner";
import { Carousel } from "../Carousel/Carousel";

export const SeriesPage = () => {
  const { generos } = useGlobalContext();

  return (
    <>
      <Banner />
      <div className="container-carousels">
        {generos &&
          generos.tv.map((genero, index) => (
            <Carousel
              key={`tv-${index}-${genero.name}`}
              genre_id={genero.id}
              textHeader={`Series ${
                index !== 0 && index % 3 === 0 ? "populares" : ""
              } de ${genero.name}`}
              isSerie={true}
              isPopular={index !== 0 && index % 3 === 0}
            />
          ))}
      </div>
    </>
  );
};
