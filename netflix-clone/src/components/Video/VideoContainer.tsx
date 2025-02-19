import { useState } from "react";
import { ButtonMoreInfo } from "../Buttons/ButtonMoreInfo";
import { ButtonPlayRect } from "../Buttons/ButtonPlayRect";
import "./VideoContainer.css";
import YouTubePlayer from "./YoutubePlayer";
import { ButtonRestart } from "../Buttons/ButtonRestart";
import { ButtonMute } from "../Buttons/ButtonMute";
import { ButtonVolume } from "../Buttons/ButtonVolume";

const sonicData = {
  adult: false,
  backdrop_path: "/zOpe0eHsq0A2NvNyBbtT6sj53qV.jpg",
  belongs_to_collection: {
    id: 720879,
    name: "Sonic - Colección",
    poster_path: "/fx5ap8o1RDwSoiEJho98jyussY3.jpg",
    backdrop_path: "/l5CIAdxVhhaUD3DaS4lP4AR2so9.jpg",
  },
  budget: 122000000,
  genres: [
    {
      id: 28,
      name: "Acción",
    },
    {
      id: 878,
      name: "Ciencia ficción",
    },
    {
      id: 35,
      name: "Comedia",
    },
    {
      id: 10751,
      name: "Familia",
    },
  ],
  homepage: "",
  id: 939243,
  imdb_id: "tt18259086",
  origin_country: ["US"],
  original_language: "en",
  original_title: "Sonic the Hedgehog 3",
  overview:
    "Sonic, Knuckles y Tails se reúnen para enfrentarse a un nuevo y poderoso adversario, Shadow, un misterioso villano cuyos poderes no se parecen a nada de lo que nuestros héroes han conocido hasta ahora. Con sus facultades superadas en todos los sentidos, el Equipo Sonic tendrá que establecer una insólita alianza con la esperanza de detener a Shadow y proteger el planeta.",
  popularity: 2525.912,
  poster_path: "/3aDWCRXLYOCuxjrjiPfLd79tcI6.jpg",
};

const urlPoster = "https://image.tmdb.org/t/p/original/";

export const VideoContainer = ({
  route,
  site = "Youtube",
  banner = false,
  className = "",
}: {
  route: string;
  site?: string;
  banner?: boolean;
  className?: string;
}) => {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [muteVideo, setMuteVideo] = useState(true);

  const handleVideoEnd = () => {
    setVideoPlaying(false);
  };

  const handleClickRestart = () => {
    setVideoPlaying(true);
  };

  return (
    <>
      <div
        className={`video-container ${banner ? "banner" : "hoverModal-video"} ${
          className ? className : ""
        }`}
      >
        {banner && (
          <div className="video-container-data">
            <h3>
              {" "}
              <img src="/assets/netflix-logo.png" alt="" />
              PELÍCULA
            </h3>
            <h2>{sonicData.original_title}</h2>
            <p>{sonicData.overview}</p>
            <div className="video-container-buttons">
              <ButtonPlayRect />
              <ButtonMoreInfo />
            </div>
          </div>
        )}
        {videoPlaying ? (
          <>
            <YouTubePlayer
              videoId={route}
              onEnd={handleVideoEnd}
              onMuted={muteVideo}
            />
            {muteVideo ? (
              <ButtonMute onClick={() => setMuteVideo(false)} />
            ) : (
              <ButtonVolume onClick={() => setMuteVideo(true)} />
            )}
          </>
        ) : (
          <>
            <img src={urlPoster + sonicData.backdrop_path} alt="" />
            <ButtonRestart onClick={handleClickRestart} />
          </>
        )}
      </div>
    </>
  );
};
