import { useContext, useEffect, useState } from "react";
import { fetchMovieVideos, fetchTVVideos } from "../../services/fetchs";
import { GenresList } from "../Carousel/GenresList";
import "./HoverModal.css";
import { ButtonArrowDown } from "../Buttons/ButtonArrowDown";
import { ButtonPlayCirc } from "../Buttons/ButtonPlayCirc";
import { ButtonAddList } from "../Buttons/ButtonAddList";
import { LikeGroupButton } from "../Buttons/LikeGroupButton";
import { GlobalContext } from "../../context/global.context";
import YouTubePlayer from "../Video/YoutubePlayer";
import { ButtonMute } from "../Buttons/ButtonMute";
import { ButtonVolume } from "../Buttons/ButtonVolume";
import { ButtonCheck } from "../Buttons/CircleButtons/ButtonCheck";
import { TVShow } from "../../interfaces";
import { motion } from "motion/react";

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
  const {
    generos,
    contentPicked,
    setShowHover,
    contentPickedPos,
    setIsModalOpen,
  } = useContext(GlobalContext);

  const movie: Movie | TVShow = { ...contentPicked };
  const genres = "title" in contentPicked ? generos.movies : generos.tv;

  const movieGenres = Object.values(genres).filter((genero) =>
    movie.genre_ids.includes(genero.id)
  );

  const [videos, setVideos] = useState<VideoMovie[]>([]);
  const [showVideo, setShowVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAddList, setIsAddList] = useState(false);

  const handleMouseLeave = () => {
    setShowHover(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if ("title" in contentPicked) {
          const data = await fetchMovieVideos(movie.id);
          if (data.length === 0) {
            const newData = await fetchMovieVideos(movie.id, "en-US");
            setVideos(
              newData.some((video) => video.type === "Trailer")
                ? newData.filter((video) => video.type === "Trailer")
                : newData
            );
          } else {
            setVideos(data.filter((video) => video.type === "Trailer"));
          }
        } else {
          const data = await fetchTVVideos(movie.id);
          if (data.length === 0) {
            const newData = await fetchTVVideos(movie.id, "en-US");
            setVideos(
              newData.some((video) => video.type === "Trailer")
                ? newData.filter((video) => video.type === "Trailer")
                : newData
            );
          } else {
            setVideos(data.filter((video) => video.type === "Trailer"));
          }
        }
      } catch (error) {
        console.error("Error al obtener videos:", error);
      }
    };

    fetchData();
  }, [contentPicked, movie.id]);

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
    <motion.div
      className="hoverModal"
      onMouseLeave={handleMouseLeave}
      initial={{
        left: `${contentPickedPos.x}px`,
        top: `${contentPickedPos.y}px`,
        scale: 0,
      }}

      animate={{
        left: `${contentPickedPos.x}px`,
        top: `${contentPickedPos.y}px`,
        scale: 1,
        transition: {duration: .5}
      }}
    >
      <div className="hoverModal-display-container">
        {showVideo ? (
          <div className="hoverModal-video-container">
            {isPlaying ? (
              <>
                <YouTubePlayer
                  videoId={videos[0]?.key}
                  onMuted={isMuted}
                  onEnd={() => setIsPlaying(false)}
                />
                {isMuted ? (
                  <ButtonMute onClick={() => setIsMuted(false)} />
                ) : (
                  <ButtonVolume onClick={() => setIsMuted(true)} />
                )}
              </>
            ) : (
              <img
                src={urlPoster + movie.backdrop_path}
                alt=""
                className="hoverModal-img"
              />
            )}
          </div>
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
            <ButtonPlayCirc onClick={() => console.log("play")} />
            {isAddList ? (
              <ButtonCheck onClick={() => setIsAddList(false)} />
            ) : (
              <ButtonAddList onClick={() => setIsAddList(true)} />
            )}
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
    </motion.div>
  );
};
