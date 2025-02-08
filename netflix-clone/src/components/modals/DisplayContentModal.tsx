import { useContext, useEffect, useState } from "react";
import {
  fetchMovieCast,
  fetchMovieSimilar,
  fetchMovieVideos,
} from "../../services/fetchs";
import { VideoContainer } from "../Video/VideoContainer";
import "./DisplayContentModal.css";
import { ButtonAddList } from "../Buttons/ButtonAddList";
import { ButtonArrowDown } from "../Buttons/ButtonArrowDown";
import { ButtonClose } from "../Buttons/ButtonClose";
import { GlobalContext } from "../../context/global.context";
interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface Genero {
  id: number;
  name: string;
}

interface VideoMovie {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

interface CastMovie {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

interface CrewMovie {
  adult: boolean;
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}

interface CreditsMovie {
  cast: CastMovie[];
  crew: CrewMovie[];
}

const urlPoster = "https://image.tmdb.org/t/p/original/";

export const DisplayContentModal = () => {

  const {moviePicked, generos, setIsModalOpen} = useContext(GlobalContext)

  const genres = generos

  const movieGenres = genres.filter((genero) =>
    moviePicked.genre_ids.includes(genero.id)
  );

  const [videos, setVideos] = useState<VideoMovie[]>([]);
  const [cast, setCast] = useState<CreditsMovie>([]);
  const [movieSimilar, setMovieSimilar] = useState<Movie[]>([]);
  const [showVideo, setShowVideo] = useState(false);

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const handleClickOutside = (e: React.MouseEvent) => {
    // Cerrar el modal si se hace clic fuera de él
    if (
      e.target instanceof HTMLElement &&
      e.target.classList.contains("displayContentModal")
    ) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data, dataCast, dataSimilar] = await Promise.all([
          fetchMovieVideos(moviePicked.id),
          fetchMovieCast(moviePicked.id),
          fetchMovieSimilar(moviePicked.id),
        ]);
        setVideos(data.filter((video) => video.type === "Teaser"));
        setCast(dataCast);
        setMovieSimilar(dataSimilar);
        console.log("similar: ", movieSimilar);
        console.log("cast entero: ", dataCast);
        const departments = new Set(
          dataCast.cast.map((actor) => actor.known_for_department)
        );
        const departmentsCrew = new Set(
          dataCast.crew.map((actor) => actor.known_for_department)
        );

        // Convertir Set a array y mostrarlo
        console.log("cast: ", [...departments]);
        console.log("crew: ", [...departmentsCrew]);
        console.log("generos: ", genres);
        console.log("mis generos: ", movieGenres);
      } catch (error) {
        console.error("Error al obtener videos:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const handleClickAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
    console.log("esta ", isAccordionOpen ? "abierto" : "cerrado");
  };

  return (
    <div className="displayContentModal" onClick={handleClickOutside}>
      <div className="displayContentModal-content">
        <div className="displayContentModal-player">
          <ButtonClose onClick={() => setIsModalOpen(false)} />
          {showVideo ? (
            <VideoContainer
              route={videos[0]?.key}
              banner={false}
              className={showVideo ? "show" : "hidden"}
            />
          ) : (
            <img
              src={urlPoster + moviePicked.backdrop_path}
              alt=""
              className={showVideo ? "hidden" : "show"}
            />
          )}
        </div>
        <div className="displayContentModal-wrapper">
          <div className="displayContentModal-info">
            <div>
              <h3>Sinopsis:</h3>
              <p>{moviePicked.overview}</p>
            </div>
            <div>
              <div className="list-container">
                <h4 className="list-head">Reparto:</h4>
                {cast.crew
                  ?.filter((actor) => actor.known_for_department === "Acting")
                  .map((actor, index, array) => (
                    <span key={actor.id} className="list-content">
                      <a href={"#"}>
                        {actor.name}
                        {index !== array.length - 1 && ","}
                      </a>
                    </span>
                  ))}
              </div>
              <div className="list-container">
                <h4 className="list-head">Géneros:</h4>
                {movieGenres.map((genero, index, array) => (
                  <span key={genero.id} className="list-content">
                    <a href={"#"}>
                      {genero.name}
                      {index !== array.length - 1 && ","}
                    </a>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <h3>Similares</h3>
          <div
            className={`display-accordion ${
              isAccordionOpen ? "open" : "close"
            }`}
          >
            <div className="accordion-grid-container">
              {movieSimilar.map((movie) => (
                <div key={movie.id} className="card">
                  <div className="card-img">
                    <img
                      src={
                        movie?.backdrop_path
                          ? urlPoster + movie.backdrop_path
                          : movie?.poster_path
                          ? urlPoster + movie.poster_path
                          : "/assets/netflix-logo.png"
                      }
                      alt=""
                    />
                  </div>
                  <h2>{movie.title}</h2>
                  <div className="card-metadata">
                    <span>{movie?.release_date}</span>
                    <ButtonAddList showTooltip={true} />
                  </div>
                  <div className="card-overview">
                    <p>{movie?.overview ? movie.overview : "Sin sinopsis"}</p>
                  </div>
                </div>
              ))}
            </div>
            <div
              className={`accordion-up-down ${
                isAccordionOpen ? "open" : "close"
              }`}
              onClick={handleClickAccordion}
            >
              <ButtonArrowDown />
            </div>
          </div>
          <div className="displayContentModal-about">
            <h3>Acerca de {moviePicked.title}</h3>
            <div className="list-container">
              <h4 className="list-head">Dirigida por:</h4>
              {cast.crew
                ?.filter((actor) => actor.known_for_department === "Directing")
                .map((actor, index, array) => (
                  <span key={actor.id} className="list-content">
                    <a href={"#"}>
                      {actor.name}
                      {index !== array.length - 1 && ","}
                    </a>
                  </span>
                ))}
            </div>
            <div className="list-container">
              <h4 className="list-head">Reparto:</h4>
              {cast.crew
                ?.filter((actor) => actor.known_for_department === "Acting")
                .map((actor, index, array) => (
                  <span key={actor.id} className="list-content">
                    <a href={"#"}>
                      {actor.name}
                      {index !== array.length - 1 && ","}
                    </a>
                  </span>
                ))}
            </div>
            <div className="list-container">
              <h4 className="list-head">Guionista:</h4>
              {cast.crew
                ?.filter((actor) => actor.known_for_department === "Writing")
                .map((actor, index, array) => (
                  <span key={actor.id} className="list-content">
                    <a href={"#"}>
                      {actor.name}
                      {index !== array.length - 1 && ","}
                    </a>
                  </span>
                ))}
            </div>
            <div className="list-container">
              <h4 className="list-head">Géneros:</h4>
              {movieGenres.map((genero, index, array) => (
                <span key={genero.id} className="list-content">
                  <a href={"#"}>
                    {genero.name}
                    {index !== array.length - 1 && ","}
                  </a>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

{
  /* <div className="list-container">
  <h4 className="list-head">Guionista:</h4>
  {cast.crew
    ?.filter((actor) => actor.known_for_department === "Writing")
    .map((actor, index, array) => (
      <span key={actor.id} className="list-content">
        <a href={"#"}>
          {actor.name}
          {index !== array.length - 1 && ","}
        </a>
      </span>
    ))}
</div>; */
}
