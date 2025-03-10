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
  const { generos, showHover, isModalOpen, isResizing } = useGlobalContext();

  return (
    <>
      <Nav></Nav>

      <Banner />
      <div className="container-carousels">
        {generos && generos.movies.length > 0 && (
          <>
            <Carousel genre_id={35} textHeader={`Películas de ${generos.movies[0].name}`} isSerie={false} />
            <Carousel genre_id={35} textHeader={`Películas de ${generos.tv[0].name}`} isSerie={true} />
            <Carousel genre_id={35} textHeader={`Películas de ${generos.tv[1].name}`} isSerie={true} isPopular={true} />
          </>
        )}
      </div>

      {showHover && !isResizing && <HoverModal />}
      {isModalOpen && <DisplayContentModal />}
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
