import "./VideoContainer.css";

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
  className = ''
}: {
  route: string;
  site?: string;
  banner?: boolean;
  className?: string
}) => {
  // Para YouTube, añadimos el parámetro autoplay a la URL
  const videoUrl =
    site === "Youtube"
      ? `https://www.youtube.com/embed/${route}?autoplay=1&mute=1`
      : route;

  return (
    <>
      <div className={`video-container ${banner ? "banner" : "hoverModal-video"} ${className ? className : ''}`}>
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
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  role="img"
                  viewBox="0 0 24 24"
                  data-icon="PlayStandard"
                  aria-hidden="true"
                >
                  <path
                    d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z"
                    fill="currentColor"
                  ></path>
                </svg>
                Reproducir
              </button>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  data-icon="CircleIStandard"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z"
                    fill="currentColor"
                  ></path>
                </svg>
                Más información
              </button>
            </div>
          </div>
        )}
        {site === "Youtube" ? (
          <iframe
            src={videoUrl}
            title="YouTube video player"
            allow="autoplay"
            allowFullScreen
          ></iframe>
        ) : (
          <img src={urlPoster + sonicData.backdrop_path} alt="" />
        )}
      </div>
    </>
  );
};
