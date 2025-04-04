import { SearchBar } from "../Search/SearchBar";
import "./nav.css";
import { NotificationNav } from "./NotificationNav";
import { SubMenuConfig } from "./SubMenuConfig";
import { useGlobalContext } from "../../context/global.context";
import { useNavigate } from "react-router-dom";

export const Nav = () => {
  const { setQuery } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <div className="nav">
      <div className="nav-left">
        <a className="nav-logo" href="#" onClick={() => navigate("/")}>
          CLONFLIX
        </a>
        <ul className="nav-list">
          <li className="" onClick={() => navigate("/")}>
            <a href="#">Inicio</a>
          </li>
          <li className="" onClick={() => navigate("series")}>
            <a href="#">Series</a>
          </li>
          <li className="" onClick={() => navigate("peliculas")}>
            <a href="#">Películas</a>
          </li>
          <li className="no-available">
            <a href="#">Novedades más vistas</a>
          </li>
          <li className="no-available">
            <a href="#">Mi lista</a>
          </li>
          <li className="no-available">
            <a href="#">Explorar por idiomas</a>
          </li>
        </ul>
        <div className="nav-menu">
          <button className="nav-menu-btn">Menú <span className="caret"></span></button>
          <ul className="nav-menu-dropdown">
            <li>
              <a href="#">Inicio</a>
            </li>
            <li>
              <a href="#">Series</a>
            </li>
            <li>
              <a href="#">Películas</a>
            </li>
            <li>
              <a href="#">Novedades más vistas</a>
            </li>
            <li>
              <a href="#">Mi lista</a>
            </li>
            <li>
              <a href="#">Explorar por idiomas</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="nav-right">
        <SearchBar onQueryChange={setQuery} />
        <a href="#" className="no-available">
          Infantil
        </a>
        <NotificationNav />
        <SubMenuConfig />
      </div>
    </div>
  );
};
