import "./App.css";
import {
  Banner,
  Carousel,
  DisplayContentModal,
  HoverModal,
  Nav,
} from "./components";
import { useGlobalContext } from "./context/global.context";

function App() {
  const { generos, showHover, isModalOpen } = useGlobalContext();

  return (
    <>
      <Nav></Nav>

      <Banner />
      <div className="container-carousels">
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
      </div>

      {showHover && <HoverModal />}
      {isModalOpen && <DisplayContentModal />}
      {/* <script src="https://www.youtube.com/iframe_api"></script> */}
    </>
  );
}

export default App;
