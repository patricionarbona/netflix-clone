import { useContext, useEffect, useState } from "react";
import {
  fetchMovieCast,
  fetchMovieSimilar,
  fetchMovieVideos,
  fetchTVCast,
  fetchTVSimilar,
  fetchTVVideos,
} from "../../services/fetchs";
import "./DisplayContentModal.css";
import { ButtonAddList } from "../Buttons/ButtonAddList";
import { ButtonClose } from "../Buttons/ButtonClose";
import { GlobalContext } from "../../context/global.context";
import YouTubePlayer from "../Video/YoutubePlayer";
import { ButtonMute } from "../Buttons/ButtonMute";
import { ButtonVolume } from "../Buttons/ButtonVolume";
import { ButtonPlayRect } from "../Buttons/ButtonPlayRect";
import { LikeGroupButton } from "../Buttons/LikeGroupButton";
import { ButtonCheck } from "../Buttons/CircleButtons/ButtonCheck";
import { TVShow } from "../../interfaces";
import { Accordion } from "../Accordion/Accordion";
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
  const { contentPicked, generos, setIsModalOpen } = useContext(GlobalContext);

  const genres = "title" in contentPicked ? generos.movies : generos.tv;

  const movieGenres = genres.filter((genero) =>
    contentPicked?.genre_ids.includes(genero.id)
  );

  const [videos, setVideos] = useState<VideoMovie[]>([]);
  const [cast, setCast] = useState<CreditsMovie>({
    cast: [],
    crew: [],
  });
  const [movieSimilar, setMovieSimilar] = useState<Movie[] | TVShow[]>([]);
  const [showVideo, setShowVideo] = useState(false);

  const [isMuted, setIsMuted] = useState(true);
  const [isAddList, setIsAddList] = useState(false);

  const handleClickOutside = (e: React.MouseEvent) => {
    // Cerrar el modal si se hace clic fuera de él
    if (e.target instanceof HTMLElement && e.target === e.currentTarget) {
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
        if ("title" in contentPicked) {
          const [data, dataCast, dataSimilar] = await Promise.all([
            fetchMovieVideos(contentPicked.id),
            fetchMovieCast(contentPicked.id),
            fetchMovieSimilar(contentPicked.id),
          ]);
          if (data.length === 0) {
            const newData = await fetchMovieVideos(contentPicked.id, "en-US");
            setVideos(
              newData.some((video) => video.type === "Trailer")
                ? newData.filter((video) => video.type === "Trailer")
                : newData
            );
          } else {
            setVideos(data.filter((video) => video.type === "Trailer"));
          }
          setCast(dataCast);
          setMovieSimilar(dataSimilar);
        } else {
          console.log(contentPicked.id);
          const [data, dataCast, dataSimilar] = await Promise.all([
            fetchTVVideos(contentPicked.id),
            fetchTVCast(contentPicked.id),
            fetchTVSimilar(contentPicked.id),
          ]);
          if (data.length === 0) {
            const newData = await fetchTVVideos(contentPicked.id, "en-US");
            setVideos(
              newData.some((video) => video.type === "Trailer")
                ? newData.filter((video) => video.type === "Trailer")
                : newData
            );
          } else {
            setVideos(data.filter((video) => video.type === "Trailer"));
          }
          setCast(dataCast);
          setMovieSimilar(dataSimilar);
        }
      } catch (error) {
        console.error("Error al obtener videos:", error);
      }
    };

    mountHandleScrollBarWidth();
    fetchData();

    return () => {
      dismountHandleScrollBarWidth();
    };
  }, [contentPicked]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="displayContentModal">
      <div
        className="displayContentModal-mask"
        onClick={handleClickOutside}
      ></div>
      <div className="displayContentModal-content">
        <div className="displayContentModal-player-container">
          <ButtonClose onClick={() => setIsModalOpen(false)} />
          <div className="displayContentModal-player">
            {showVideo && videos.length > 0 ? (
              <YouTubePlayer
                videoId={videos[0]?.key}
                onEnd={() => setShowVideo(false)}
                onMuted={isMuted}
              />
            ) : (
              <img
                src={urlPoster + contentPicked?.backdrop_path}
                alt=""
                className={showVideo ? "hidden" : "show"}
              />
            )}
          </div>
          <div className="displayContentModal-player-data">
            <div className="displayContentModal-player-info">
              <h3>PELÍCULA</h3>
              <h2>
                {"title" in contentPicked
                  ? contentPicked.title
                  : contentPicked.name}
              </h2>
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
              <p>{contentPicked.overview || 'Sin sinopsis'}</p>
            </div>
            <div>
              <div className="list-container">
                <h4 className="list-head">Reparto:</h4>
                {cast.cast
                  ?.filter((actor) => actor.known_for_department === "Acting")
                  .map((actor, index, array) => (
                    <span key={`head-actors-${index}`} className="list-content">
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
                  <span key={`head-genres-${index}`} className="list-content">
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
          <Accordion alturaCerrado={"calc(3 * 18.5rem + 3 * 1.5rem - 2rem)"}>
            <div className="similar-grid-container">
              {movieSimilar.map((movie, index) => (
                <div key={`similar-movie-${index}`} className="card">
                  <div className="card-img">
                    <img
                      src={
                        movie?.backdrop_path
                          ? urlPoster + movie.backdrop_path
                          : movie?.poster_path
                          ? urlPoster + movie.poster_path
                          : // : "./netflix-logo.png"
                            "#"
                      }
                      alt=""
                    />
                  </div>
                  <h2>{"title" in movie ? movie.title : movie.name}</h2>
                  <div className="card-metadata">
                    <span>
                      {"title" in movie
                        ? movie.release_date
                        : movie.first_air_date}
                    </span>
                    <ButtonAddList />
                  </div>
                  <div className="card-overview">
                    <p>{movie?.overview ? movie.overview : "Sin sinopsis"}</p>
                  </div>
                </div>
              ))}
            </div>
          </Accordion>

          <div className="displayContentModal-about">
            <h3>
              Acerca de{" "}
              {"title" in contentPicked
                ? contentPicked.title
                : contentPicked.name}
            </h3>
            <div className="list-container">
              <h4 className="list-head">Dirigida por:</h4>
              {(
                cast.crew?.filter(
                  (actor) => actor.known_for_department === "Directing"
                ) || []
              ).length > 0 ? (
                cast.crew
                  ?.filter(
                    (actor) => actor.known_for_department === "Directing"
                  )
                  .map((actor, index, array) => (
                    <span key={`film-directors-${index}`} className="list-content">
                      <a href={"#"}>
                        {actor.name}
                        {index !== array.length - 1 && ","}
                      </a>
                    </span>
                  ))
              ) : (
                <span>Sin especificar</span>
              )}
            </div>
            <div className="list-container">
              <h4 className="list-head">Reparto:</h4>
              {cast.cast
                ?.filter((actor) => actor.known_for_department === "Acting")
                .map((actor, index, array) => (
                  <span key={`actors-${index}`} className="list-content">
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
                  <span key={`writers-${index}`} className="list-content">
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
                <span key={`genres-${index}`} className="list-content">
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
