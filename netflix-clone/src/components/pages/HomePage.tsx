import { useGlobalContext } from "../../context/global.context";
import { Banner } from "../Banner/Banner";
import { Carousel } from "../Carousel/Carousel";
import { DisplayContentModal } from "../modals/DisplayContentModal";
import { HoverModal } from "../modals/HoverModal";

export const HomePage = () => {
  const { generos, showHover, isModalOpen, isResizing } = useGlobalContext();

  return (
    <>
      <Banner />
      <div className="container-carousels">
        {generos && generos.movies.length > 0 && (
          <>
            <Carousel
              genre_id={35}
              textHeader={`Películas de ${generos.movies[0].name}`}
              isSerie={false}
            />
            <Carousel
              genre_id={35}
              textHeader={`Películas de ${generos.tv[0].name}`}
              isSerie={true}
            />
            <Carousel
              genre_id={35}
              textHeader={`Películas de ${generos.tv[1].name}`}
              isSerie={true}
              isPopular={true}
            />
          </>
        )}
      </div>

      {showHover && !isResizing && <HoverModal />}
      {isModalOpen && <DisplayContentModal />}
    </>
  );
};
