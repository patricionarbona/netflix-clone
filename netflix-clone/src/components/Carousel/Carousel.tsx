import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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
  const carouselRef = useRef<HTMLDivElement>(null);
  const [itemsView, setItemsView] = useState(0);
  const [moved, setMoved] = useState(false); //saber si se movio al inicio

  const handleNext = () => {
    if (carouselRef.current) {
      const item = carouselRef.current.querySelector(
        ".carousel-slider"
      ) as HTMLElement;
      if (!item) {
        return;
      }

      if (moved) {
        const imgs = item.querySelectorAll("img");
        const groupToMove = Array.from(imgs).slice(0, itemsView);
        groupToMove.map((newImg) => item.appendChild(newImg));
      }

      if(position === Math.ceil(movies.length / itemsView) - 1) {
        setPosition(0)
      } else {
        setPosition((position) => position + 1);
      }

      setMoved(true);
    }
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      const item = carouselRef.current.querySelector(
        ".carousel-slider"
      ) as HTMLElement;

      if (!item) return;

      if (moved) {
        const imgs = item.querySelectorAll("img");
        const groupToMove = Array.from(imgs).slice(-itemsView, imgs.length);
        groupToMove.reverse().map((newImg) => item.prepend(newImg));
      }

      if(position === 0) {
        setPosition(Math.ceil(movies.length / itemsView) - 1)
      } else {
        setPosition((position) => position - 1);
      }

    }
  };

  // Event resize
  const handleResize = () => {
    console.log("first");
    const slider = carouselRef.current?.querySelector(
      ".carousel-slider"
    ) as HTMLElement;
    if (slider) {
      // Obtener el valor de la propiedad CSS personalizada
      const style = getComputedStyle(slider);
      const itemsPerScreen = style.getPropertyValue("--items-per-screen");
      setItemsView(parseInt(itemsPerScreen));

      console.log("Items per screen:", itemsPerScreen);
    }
  };

  //useLayout to get --items-per-screen from css
  useLayoutEffect(() => {
    paramsLanguage.append("with_genres", String(genre_id));
    paramsLanguage.append("primary_release_date.gte", "2024-01-01");
    paramsLanguage.append("primary_release_date.lte", "2024-12-31");

    const fetchData = async () => {
      try {
        const data = await fetchPages<FetchMovies>(urlGenre, paramsLanguage, 2);
        setMovies(data.map((item) => item.results).flat());
        const slider = carouselRef.current?.querySelector(
          ".carousel-slider"
        ) as HTMLElement;
        if (slider) {
          const style = getComputedStyle(slider);
          const itemsPerScreen = style.getPropertyValue("--items-per-screen");
          setItemsView(parseInt(itemsPerScreen) || 1); // Valor por defecto si no se encuentra
        }
        setLoading(false);
      } catch (error) {
        setError(`Error al cargar las peliculas: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [genre_id]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="carousel" ref={carouselRef}>
      <div className="carousel-header">
        <h4 className="carousel-title">{name}</h4>
        <div className="carousel-progress-bar">
          {itemsView > 0 &&
            Array.from({ length: Math.ceil(movies.length / itemsView) }).map(
              (_, index) => (
                <div
                  key={"bar-" + index}
                  className={`bar ${index === position ? "bar-active" : ""}`}
                ></div>
              )
            )}
        </div>
      </div>
      <div className="carousel-container">
        <button
          className="carousel-handle carousel-left-handle"
          onClick={handlePrev}
          style={{
            visibility: `${moved ? "visible" : "hidden"}`,
          }}
        >
          <div className="text">&#8249;</div>
        </button>
        <div
          className="carousel-slider"
          style={{
            transform: `translateX(${moved ? "-100" : "0"}%)`,
          }}
        >
          {movies.map((movie) => (
            <img
              key={`${genre_id}-slider-${movie.id}`}
              src={urlPoster + movie.backdrop_path}
            />
          ))}
        </div>
        <button
          className="carousel-handle carousel-right-handle"
          onClick={handleNext}
        >
          <div className="carousel-text">&#8250;</div>
        </button>
      </div>
    </div>
  );
};
