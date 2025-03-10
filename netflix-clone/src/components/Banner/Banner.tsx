import { useContext, useEffect, useState } from "react";
import "./banner.css";
import { defaultMovie, Movie, TVShow, VideoMovie } from "../../interfaces";
import {
  fetchMoviePopular,
  fetchMovieVideos,
  fetchTVPopular,
  fetchTVVideos,
} from "../../services/fetchs";
import { ButtonPlayRect } from "../Buttons/ButtonPlayRect";
import { ButtonMoreInfo } from "../Buttons/ButtonMoreInfo";
import YouTubePlayer from "../Video/YoutubePlayer";
import { ButtonMute } from "../Buttons/ButtonMute";
import { ButtonVolume } from "../Buttons/ButtonVolume";
import { ButtonRestart } from "../Buttons/ButtonRestart";
import { GlobalContext } from "../../context/global.context";

export const Banner = ({ isSerie }: { isSerie?: boolean }) => {
  const { isModalOpen, setContentPicked, setIsModalOpen } =
    useContext(GlobalContext);
  const [movie, setMovie] = useState<Movie | TVShow>(defaultMovie);
  const [video, setVideo] = useState<VideoMovie | null>(null);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [muteVideo, setMuteVideo] = useState(true);
  const [timeUp, setTimeUp] = useState(false);

  const urlPoster = "https://image.tmdb.org/t/p/original/";

  const handleVideoEnd = () => {
    setVideoPlaying(false);
  };

  const handleClickRestart = () => {
    setVideoPlaying(true);
  };

  const handleMoreInfo = () => {
    setContentPicked(movie);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await fetchMoviePopular();
        const dataVideos = await fetchMovieVideos(data.id);
        if (dataVideos.length === 0) {
          const newData = await fetchMovieVideos(data.id, "en-US");
          setVideo(newData.filter((video) => video.type === "Trailer")[0]);
        } else {
          setVideo(dataVideos.filter((video) => video.type === "Trailer")[0]);
        }
        setMovie(data);
      } catch (error) {
        console.error("error al recuperar los datos", error);
      }
    };

    const fetchTV = async () => {
      try {
        const data = await fetchTVPopular();
        const dataVideos = await fetchTVVideos(data.id);
        if (dataVideos.length === 0) {
          const newData = await fetchTVVideos(data.id, "en-US");
          setVideo(newData.filter((video) => video.type === "Trailer")[0]);
        } else {
          setVideo(dataVideos.filter((video) => video.type === "Trailer")[0]);
        }
        setMovie(data);
      } catch (error) {
        console.error("error al recuperar los datos", error);
      }
    };

    if (isSerie) {
      fetchTV();
    } else {
    fetchMovie();
    }
  }, [isSerie]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeUp(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {movie && (
        <>
          <div className="banner">
            <div className="banner-video-container">
              {videoPlaying && !isModalOpen ? (
                <>
                  <YouTubePlayer
                    videoId={video?.key ?? ''}
                    onEnd={handleVideoEnd}
                    onMuted={muteVideo}
                  />
                </>
              ) : (
                <>
                  <img
                    src={urlPoster + movie.backdrop_path}
                    alt=""
                    className="banner-img"
                  />
                </>
              )}
            </div>
            <div className="banner-container">
              <div className={`banner-container-data ${timeUp ? 'active' : ''}`}>
                <h3>
                  {" "}
                  PELÍCULA
                </h3>
                <h2>{movie?.title}</h2>
                <p>{movie?.overview}</p>
                <div className="banner-container-buttons">
                  <ButtonPlayRect />
                  <ButtonMoreInfo onClick={handleMoreInfo} />
                </div>
              </div>
              <div className="banner-buttons">
                {videoPlaying ? (
                  muteVideo ? (
                    <ButtonMute onClick={() => setMuteVideo(false)} />
                  ) : (
                    <ButtonVolume onClick={() => setMuteVideo(true)} />
                  )
                ) : (
                  <ButtonRestart onClick={handleClickRestart} />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
