import { SearchBar } from "../Search/SearchBar";
import "./nav.css";
import { NotificationNav } from "./NotificationNav";
import { SubMenuConfig } from "./SubMenuConfig";

export const Nav = () => {
  return (
    <div className="nav">
      <div className="nav-left">
        <a className="nav-logo" href="#">
          CLONFLIX
        </a>
        <ul className="nav-list">
          <li className="no-available">
            <a href="#">Inicio</a>
          </li>
          <li className="no-available">
            <a href="#">Series</a>
          </li>
          <li className="no-available">
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
          <button className="nav-menu-btn">Menú&nbsp;▼</button>
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
        <SearchBar />
        <a href="#" className="no-available">Infantil</a>
        <NotificationNav />
        <SubMenuConfig />
      </div>
    </div>
  );
};
