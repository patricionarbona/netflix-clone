import React, { useEffect, useRef, useState } from "react";
import { fetchPages } from "../../services/fetchs";
import "./Carousel.css";

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

interface FetchMovies {
  page: number;
  results: Movie[];
}

const urlGenre = "https://api.themoviedb.org/3/discover/movie";
const urlPoster = "https://image.tmdb.org/t/p/original/";

const paramsLanguage = new URLSearchParams({
  language: "es-ES",
  sort_by: "popularity.desc",
});

export const Carousel = ({
  genre_id,
  name,
}: {
  genre_id: number;
  name: string;
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // states del carousel
  const [position, setPosition] = useState(0);
  const [offset, setOffSet] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    console.log("next");
    console.log(position);
    if (carouselRef.current) {
      const item = carouselRef.current.querySelector(
        ".carousel-slider"
      ) as HTMLElement;
      if (item) {
        setOffSet((prevOffset) => prevOffset - 100);
        setPosition((position) => position + 1);
        console.log(Math.ceil(movies.length / 3))
        console.log(movies.length / 3)
      }
    }
  };

  const handlePrev = () => {
    console.log("prev");
    console.log(position);
    if (carouselRef.current) {
      const item = carouselRef.current.querySelector(
        ".carousel-slider"
      ) as HTMLElement;
      if (item) {
        setOffSet((prevOffset) => prevOffset + 100);
        setPosition((position) => position - 1);
      }
    }
  };

  useEffect(() => {
    paramsLanguage.append("with_genres", String(genre_id));
    paramsLanguage.append("primary_release_date.gte", "2024-01-01");
    paramsLanguage.append("primary_release_date.lte", "2024-12-31");

    const fetchData = async () => {
      try {
        const data = await fetchPages<FetchMovies>(urlGenre, paramsLanguage, 2);
        setMovies(data.map(item => item.results).flat());
        setLoading(false);
      } catch (error) {
        setError(`Error al cargar las peliculas: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [genre_id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="carousel">
      <div className="carousel-header">
        <h4 className="carousel-title">{name}</h4>
        <div className="carousel-progress-bar">
          {
            Array.from({length: Math.ceil(movies.length / 4)}).map((_,index) => (
              <div 
                key={'bar-' + index}
                className={`bar ${index === position? "bar-active" : ""}`}
              ></div>
            ))
          }
        </div>
      </div>
      <div className="carousel-container" ref={carouselRef}>
        <button className="carousel-handle carousel-left-handle" onClick={handlePrev}>
          <div className="text">&#8249;</div>
        </button>
        <div className="carousel-slider"
        style={{
          transform: `translateX(${offset}%)`
        }}>
          {movies.map((movie) => (
              <img key={`${genre_id}-slider-${movie.id}`} src={urlPoster + movie.backdrop_path}/>
            ))}
        </div>
        <button className="carousel-handle carousel-right-handle" onClick={handleNext}>
          <div className="carousel-text">&#8250;</div>
        </button>
      </div>
    </div>
  );
};
