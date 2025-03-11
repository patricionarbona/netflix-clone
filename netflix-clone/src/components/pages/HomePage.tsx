import { useGlobalContext } from "../../context/global.context";
import { Banner } from "../Banner/Banner";
import { Carousel } from "../Carousel/Carousel";

export const HomePage = () => {
  const { generos } = useGlobalContext();

  const array = Array.from({ length: 13 }, (_, index) => index);

  return (
    <>
      <Banner />
      <div className="container-carousels">
        {generos &&
          array.length > 0 &&
          array.map((index) => (
            <>
              {index % 3 === 0 ? (
                index % 2 === 0 ? (
                  <Carousel
                    genre_id={generos.movies[index]?.id}
                    isSerie={false}
                    textHeader={`Películas populares de ${generos.movies[index]?.name}`}
                    isPopular={true}
                  />
                ) : (
                  <Carousel
                    genre_id={generos.tv[index]?.id}
                    isSerie={true}
                    textHeader={`Series populares de ${generos.tv[index]?.name}`}
                    isPopular={true}
                  />
                )
              ) : (
                <>
                  <Carousel
                    genre_id={generos.movies[index]?.id}
                    isSerie={false}
                    textHeader={`Películas de ${generos.movies[index]?.name}`}
                  />
                  <Carousel
                    genre_id={generos.tv[index]?.id}
                    isSerie={true}
                    textHeader={`Series de ${generos.tv[index]?.name}`}
                  />
                </>
              )}
            </>
          ))}
      </div>
    </>
  );
};
