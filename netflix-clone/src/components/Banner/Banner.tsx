import { useEffect, useState } from "react";
import { useFetch } from "../../hook";
import "./banner.css";

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

interface Video {
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

interface fetchPopularMovie {
  page: number;
  results: Movie[];
}

interface fetchVideosMovie {
  id: number;
  results: Video[];
}

const urlPopularMovies = "https://api.themoviedb.org/3/movie/popular";

const paramsLanguage = new URLSearchParams({
  language: "es-ES",
});

const claveApi = import.meta.env.VITE_API_KEY;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${claveApi}`,
  },
};

export const Banner = () => {
  const [dataVideosMovie, setDataVideosMovies] =
    useState<fetchVideosMovie | null>(null);
  const { data } = useFetch<fetchPopularMovie>(
    urlPopularMovies,
    paramsLanguage
  );

  const fetchVideos = async (url: URL, params: any) => {
    const response = await fetch(url, params);
    const responseJson = await response.json();
    setDataVideosMovies(responseJson);
  };

  useEffect(() => {
    if (data) {
      const peli = data.results[0];
      if (peli?.id) {
        const urlVideosMovie = new URL(
          `https://api.themoviedb.org/3/movie/${peli.id}/videos`
        );
        urlVideosMovie.search = paramsLanguage.toString();
        fetchVideos(urlVideosMovie, options);
      }
    }
  }, [data]);

  return (
    <div className="banner">
      {dataVideosMovie
        ? dataVideosMovie.results
            .filter((video) => video.type === "Trailer")
            .map((video) => <div key={video.id}>{video.key}</div>)
        : null}
    </div>
  );
};
