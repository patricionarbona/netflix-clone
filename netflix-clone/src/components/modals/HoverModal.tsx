import { useContext, useEffect, useState } from "react";
import { fetchMovieVideos } from "../../services/fetchs";
import { GenresList } from "../Carousel/GenresList";
import { VideoContainer } from "../Video/VideoContainer";
import "./HoverModal.css";
import { ButtonArrowDown } from "../Buttons/ButtonArrowDown";
import { ButtonPlayCirc } from "../Buttons/ButtonPlayCirc";
import { ButtonAddList } from "../Buttons/ButtonAddList";
import { LikeGroupButton } from "../Buttons/LikeGroupButton";
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

const urlPoster = "https://image.tmdb.org/t/p/original/";

export const HoverModal = () => {
  const { generos, moviePicked, setShowHover, moviePickedPos, setIsModalOpen } =
    useContext(GlobalContext);

  const movie: Movie = { ...moviePicked };
  const genres = generos;

  const movieGenres = Object.values(genres).filter((genero) =>
    movie.genre_ids.includes(genero.id)
  );

  const [videos, setVideos] = useState<VideoMovie[]>([]);
  const [showVideo, setShowVideo] = useState(false);

  const handleMouseLeave = () => {
    setShowHover(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMovieVideos(movie.id);
        setVideos(data.filter((video) => video.type === "Teaser"));
        console.log("ppos: ", moviePickedPos);
      } catch (error) {
        console.error("Error al obtener videos:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
    setShowHover(false);
  };

  return (
    <div
      className="hoverModal"
      onMouseLeave={handleMouseLeave}
      style={{
        left: `${moviePickedPos.x}px`,
        top: `${moviePickedPos.y}px`,
      }}
    >
      <div className="hoverModal-display-container">
        {showVideo ? (
          <VideoContainer
            route={videos[0]?.key}
            banner={false}
            className={showVideo ? "show" : "hidden"}
          />
        ) : (
          <img
            src={urlPoster + movie.backdrop_path}
            alt=""
            className={showVideo ? "hidden" : "show"}
          />
        )}
      </div>
      <div className="hoverModal-info">
        <div className="buttonsItemControls">
          <div className="buttons-container">
            <ButtonPlayCirc />
            <ButtonAddList showTooltip={true} />
            <LikeGroupButton />
          </div>
          <div className="moreInfo">
            <ButtonArrowDown
              tooltip={true}
              tooltipText="Episodios e información"
              onClick={openModal}
            />
          </div>
        </div>
        <GenresList genres={movieGenres} />
      </div>
    </div>
  );
};
