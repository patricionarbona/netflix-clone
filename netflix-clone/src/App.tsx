import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import { DisplayContentModal, HoverModal, Nav } from "./components";
import { HomePage } from "./components/pages/HomePage";
import { ListPage } from "./components/pages/ListPage";
import { useGlobalContext } from "./context/global.context";
import { SeriesPage } from "./components/pages/SeriesPage";
import { PeliculasPage } from "./components/pages/PeliculasPage";

const base = "/clonflix/";

function App() {
  const { showHover, isModalOpen, isResizing, query, loading } =
    useGlobalContext();
  const location = useLocation();

  const showListPage = query.length > 0;

  return (
    <>
      {!loading && (
        <>
          <Nav />
          {showListPage ? (
            <ListPage />
          ) : (
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="series" element={<SeriesPage />} />
              <Route path="peliculas" element={<PeliculasPage />} />
            </Routes>
          )}
          {showHover && !isResizing && <HoverModal />}
          {isModalOpen && <DisplayContentModal />}
        </>
      )}
    </>
  );
}

function AppWrapper() {
  return (
    <Router basename={base}>
      <App />
    </Router>
  );
}

export default AppWrapper;
