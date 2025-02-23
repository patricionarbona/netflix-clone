import { useContext, useEffect, useState } from "react";
import {
  fetchMovieCast,
  fetchMovieSimilar,
  fetchMovieVideos,
} from "../../services/fetchs";
import "./DisplayContentModal.css";
import { ButtonAddList } from "../Buttons/ButtonAddList";
import { ButtonArrowDown } from "../Buttons/ButtonArrowDown";
import { ButtonClose } from "../Buttons/ButtonClose";
import { GlobalContext } from "../../context/global.context";
import YouTubePlayer from "../Video/YoutubePlayer";
import { ButtonMute } from "../Buttons/ButtonMute";
import { ButtonVolume } from "../Buttons/ButtonVolume";
import { ButtonPlayRect } from "../Buttons/ButtonPlayRect";
import { LikeGroupButton } from "../Buttons/LikeGroupButton";
import { ButtonCheck } from "../Buttons/CircleButtons/ButtonCheck";
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
  const { moviePicked, generos, setIsModalOpen } = useContext(GlobalContext);

  const genres = generos;

  const movieGenres = genres.filter((genero) =>
    moviePicked.genre_ids.includes(genero.id)
  );

  const [videos, setVideos] = useState<VideoMovie[]>([]);
  const [cast, setCast] = useState<CreditsMovie>({
    cast: [],
    crew: [],
  });
  const [movieSimilar, setMovieSimilar] = useState<Movie[]>([]);
  const [showVideo, setShowVideo] = useState(false);

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isAddList, setIsAddList] = useState(false);

  const handleClickOutside = (e: React.MouseEvent) => {
    // Cerrar el modal si se hace clic fuera de él
    if (
      e.target instanceof HTMLElement &&
      e.target.classList.contains("displayContentModal")
    ) {
      setIsModalOpen(false);
    }
  };

  const mountHandleScrollBarWidth = () => {
    const ancho = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${ancho}px`;
    document.body.style.overflowY = "hidden";
  };

  const dismountHandleScrollBarWidth = () => {
    document.body.style.paddingRight = ``;
    document.body.style.overflowY = "";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data, dataCast, dataSimilar] = await Promise.all([
          fetchMovieVideos(moviePicked.id),
          fetchMovieCast(moviePicked.id),
          fetchMovieSimilar(moviePicked.id),
        ]);
        if (data.length === 0) {
          const newData = await fetchMovieVideos(moviePicked.id, "en-US");
          setVideos(newData.filter((video) => video.type === "Trailer"));
        } else {
          setVideos(data.filter((video) => video.type === "Trailer"));
        }
        setCast(dataCast);
        setMovieSimilar(dataSimilar);
      } catch (error) {
        console.error("Error al obtener videos:", error);
      }
    };

    mountHandleScrollBarWidth();
    fetchData();

    return () => {
      dismountHandleScrollBarWidth();
    };
  }, [moviePicked.id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleClickAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <div className="displayContentModal" onClick={handleClickOutside}>
      <div className="displayContentModal-content">
        <div className="displayContentModal-player-container">
          <ButtonClose onClick={() => setIsModalOpen(false)} />
          <div className="displayContentModal-player">
            {showVideo ? (
              <YouTubePlayer
                videoId={videos[0]?.key}
                onEnd={() => setShowVideo(false)}
                onMuted={isMuted}
              />
            ) : (
              <img
                src={urlPoster + moviePicked.backdrop_path}
                alt=""
                className={showVideo ? "hidden" : "show"}
              />
            )}
          </div>
          <div className="displayContentModal-player-data">
            <div className="displayContentModal-player-info">
              <h3>
                <img src="/assets/netflix-logo.png" alt="" />
                PELÍCULA
              </h3>
              <h2>{moviePicked?.original_title}</h2>
              <div className="player-container-buttons">
                <ButtonPlayRect />
                {isAddList ? (
                  <ButtonCheck onClick={() => setIsAddList(false)} />
                ) : (
                  <ButtonAddList onClick={() => setIsAddList(true)} />
                )}
                <LikeGroupButton />
              </div>
            </div>
            <div className="displayContentModal-player-buttons">
              {isMuted ? (
                <ButtonMute onClick={() => setIsMuted(false)} />
              ) : (
                <ButtonVolume onClick={() => setIsMuted(true)} />
              )}
            </div>
          </div>
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
