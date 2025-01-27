import { useEffect, useState } from "react";
import { fetchMovieCast, fetchMovieVideos } from "../../services/fetchs";
import { ButtonsItemControls } from "../Buttons/ButtonsItemControls";
import { GenresList } from "../Carousel/GenresList";
import { VideoContainer } from "../Video/VideoContainer";
import "./DisplayContentModal.css";

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
  cast: CastMovie[]
  crew: CrewMovie[]
}

const urlPoster = "https://image.tmdb.org/t/p/original/";

export const DisplayContentModal = ({
  movie,
  genres,
}: {
  movie: Movie;
  genres: Genero[];
}) => {
  const movieGenres = genres.filter((genero) =>
    movie.genre_ids.includes(genero.id)
  );

  const [videos, setVideos] = useState<VideoMovie[]>([])
  const [cast, setCast] = useState<CreditsMovie>([])
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data, dataCast ] = await Promise.all([
          fetchMovieVideos(movie.id),
          fetchMovieCast(movie.id)
        ])
        setVideos(data.filter((video) => video.type === "Teaser"));
        setCast(dataCast)
        console.log('cast entero: ', dataCast)
        const departments = new Set(dataCast.cast.map((actor) => actor.known_for_department));
        const departmentsCrew = new Set(dataCast.crew.map((actor) => actor.known_for_department));
      
      // Convertir Set a array y mostrarlo
      console.log('cast: ', [...departments]);
      console.log('crew: ', [...departmentsCrew]);
      } catch (error) {
        console.error("Error al obtener videos:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
     <div className="displayContentModal">
       <div className="">
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
       <div className="">
         <ButtonsItemControls />
         <GenresList genres={movieGenres} />
       </div>
       <h3>Acerca de {movie.title}</h3>
       <div className="list-container">
        <h4 className="list-head">Dirigida por:</h4>
        {
          cast.crew
            ?.filter((actor) => (actor.known_for_department === 'Directing'))
            .map((actor,index,array) => (
              <span key={actor.id} className="list-content">
                <a href={'#'}>{actor.name}{index  !== array.length - 1 && ','}</a>
                {/* <img src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`} alt="" /> */}
              </span>
            ))
        }
      </div>
      <div className="list-container">
        <h4 className="list-head">Reparto:</h4>
        {
          cast.cast
            ?.filter((actor) => (actor.known_for_department === 'Acting'))
            .map((actor, index, array) => (
              <span key={actor.id} className="list-content">
                <a href={'#'}>{actor.name}{index  !== array.length - 1 && ','}</a>
                {/* <img src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`} alt="" /> */}
              </span>
            ))
        }
      </div>
      <div className="list-container">
        <h4 className="list-head">Guionista:</h4>
        {
          cast.crew
            ?.filter((actor) => (actor.known_for_department === 'Writing'))
            .map((actor,index,array) => (
              <span key={actor.id} className="list-content">
                <a href={'#'}>{actor.name}{index  !== array.length - 1 && ','}</a>
                {/* <img src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`} alt="" /> */}
              </span>
            ))
        }
      </div>
     </div>
  );
};
