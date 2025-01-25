import { useEffect, useState } from "react";
import { fetchMovieVideos } from "../../services/fetchs";
import { ButtonsItemControls } from "../Buttons/ButtonsItemControls";
import { GenresList } from "../Carousel/GenresList";
import { VideoContainer } from "../Video/VideoContainer";
import "./HoverModal.css";

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

const urlPoster = "https://image.tmdb.org/t/p/original/";

export const HoverModal = ({
  movie,
  genres,
}: {
  movie: Movie;
  genres: Genero[];
}) => {
  const movieGenres = genres.filter((genero) =>
    movie.genre_ids.includes(genero.id)
  );

  const [videos, setVideos] = useState<VideoMovie[]>([]);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMovieVideos(movie.id);
        setVideos(data.filter((video) => video.type === "Teaser"));
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

  return (
    <div className="hoverModal">
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
        <ButtonsItemControls />
        <GenresList genres={movieGenres} />
      </div>
    </div>
  );
};
