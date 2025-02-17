import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { fetchPages } from "../../services/fetchs";
import "./Carousel.css";
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
  const { setShowHover, setMoviePicked, setMoviePickedPos, clientWidth } =
    useContext(GlobalContext);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // states del carousel
  const [position, setPosition] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [itemsView, setItemsView] = useState(0);
  const [moved, setMoved] = useState(false); //saber si se movio al inicio

  let timer: number;

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>, movie: Movie) => {
    timer = setTimeout(() => {
      setMoviePicked(movie);
      setShowHover(true);
      const htmlTarget = e.target as HTMLElement;
      const htmlPos = htmlTarget.getBoundingClientRect();
      setMoviePickedPos({
        x: htmlPos.x - htmlPos.width / 4,
        y: htmlPos.y - htmlPos.height / 2 + window.scrollY,
      });
    }, 750);
  };

  const handleMouseLeave = () => {
    clearTimeout(timer);
  };

  const handleNext = () => {
    if (carouselRef.current) {
      const item = carouselRef.current.querySelector(
        ".carousel-slider"
      ) as HTMLElement;
      if (!item) {
        return;
      }
      if(moved) {
        //si se mueve a la ultima posicion
        if (position === Math.ceil(movies.length / itemsView) - 2) {
          const next = getAllPreviousElements("last", item);
          for (let i = next.length; i > itemsView * 2 - 1; i--) {
            moveFirstElement2End(item, ".carousel-img-container");
          }
        } else {
          const imgs = item.querySelectorAll(".carousel-img-container");
          const groupToMove = Array.from(imgs).slice(0, itemsView);
          groupToMove.map((newImg) => item.appendChild(newImg));
        }
      }

      if (position === Math.ceil(movies.length / itemsView) - 1) {
        setPosition(0);
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

      if (position === 1) {
        const previous = getAllPreviousElements("first", item);
        for (let i = previous.length; i < itemsView; i++) {
          moveLastElement2Start(item, ".carousel-img-container");
        }
      } else {
        const imgs = item.querySelectorAll(".carousel-img-container");

        const groupToMove = Array.from(imgs).slice(-itemsView, imgs.length);
        groupToMove.reverse().map((newImg) => item.prepend(newImg));
      }

      if (position === 0) {
        setPosition(Math.ceil(movies.length / itemsView) - 1);
      } else {
        setPosition((position) => position - 1);
      }
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

  const handleResize = () => {
    const slider = carouselRef.current?.querySelector(
      ".carousel-slider"
    ) as HTMLElement;
    if (!slider) return;
    const style = getComputedStyle(slider);
    const itemsPerScreen = parseInt(
      style.getPropertyValue("--items-per-screen")
    );
    if (itemsPerScreen !== itemsView && moved) {
      setItemsView(itemsPerScreen);
      const previous = getAllPreviousElements("first", slider);

      //carousel al inicio
      //posicion sigue en 0
      if (position === 0) {
        //reduce tamaño
        if (itemsView > itemsPerScreen) {
          //obtengo los elementos previos a first y los muevo al final
          for (let i = previous.length; i > itemsPerScreen; i--) {
            moveFirstElement2End(slider, ".carousel-img-container");
          }
        } else if (itemsView < itemsPerScreen) {
          //obtengo los elementos previos a first y los muevo al inicio
          for (let i = previous.length; i < itemsPerScreen; i++) {
            moveLastElement2Start(slider, ".carousel-img-container");
          }
        }
      }

      //resize carousel al final
      //posicion se pone al nuevo final
      if (position === Math.ceil(movies.length / itemsView) - 1) {
        const next = getAllPreviousElements("last", slider);
        //reduce tamaño
        if (itemsView > itemsPerScreen) {
          for (let i = next.length; i > itemsPerScreen * 2 - 1; i--) {
            moveFirstElement2End(slider, ".carousel-img-container");
          }
        } else if (itemsView < itemsPerScreen) {
          for (let i = next.length; i < itemsPerScreen * 2 - 1; i++) {
            moveLastElement2Start(slider, ".carousel-img-container");
          }
        }
        setPosition(Math.ceil(movies.length / itemsPerScreen) - 1);
      }

      //resize posicion 1
      //posicion sigue siendo 1
      if (position === 1) {
        const previous = getAllPreviousElements("first", slider);
        //reduce o amplia tamaño hace lo mismo
        for (let i = previous.length; i > 0; i--) {
          moveFirstElement2End(slider, ".carousel-img-container");
        }
      }

      //resize posicion penultima final - 1
      //posicion se recalcula a final - 1
      if (position === Math.ceil(movies.length / itemsView) - 2) {
        const previous = getAllPreviousElements("last", slider);
        for (let i = previous.length; i > 3 * itemsPerScreen - 1; i--) {
          moveFirstElement2End(slider, ".carousel-img-container");
        }

        setPosition(Math.ceil(movies.length / itemsPerScreen) - 2);
      }

      //resize posicion > 1 y < final -1
      if (position > 1 && position < Math.ceil(movies.length / itemsView) - 2) {
        //aumenta tamaño
        if (itemsView < itemsPerScreen || itemsView > itemsPerScreen) {
          //obtengo previous preResize
          const previousPreResize = getAllPreviousElements("last", slider);
          //calculo posibles posiciones para ese previous pre resize
          let previousPostResize = 0;
          for (
            let i = movies.length;
            i > previousPreResize.length;
            i = i - itemsPerScreen
          ) {
            previousPostResize = i;
          }
          //con los numeros de elementos obtengo la posicion
          const newPos = calculatePos(
            movies.length,
            itemsPerScreen,
            previousPostResize
          );
          setPosition(newPos);
          //sabida la posicion pongo muevo elementos
          for (
            let i = previousPreResize.length;
            i < previousPostResize - 1;
            i++
          ) {
            moveLastElement2Start(slider, ".carousel-img-container");
          }
        }
      }
    } else if (itemsPerScreen !== itemsView && !moved) {
      setItemsView(itemsPerScreen);
      const previous = getAllPreviousElements("first", slider);
      for (let i = previous.length; i > 0; i--) {
        moveFirstElement2End(slider, ".carousel-img-container");
      }
    }
  };

  const calculatePos = (total: number, vista: number, previosLast: number) => {
    return (total - previosLast) / vista + 1;
  };

  const getAllPreviousElements = (
    classTagName: string,
    containerElement: HTMLElement
  ): HTMLElement[] => {
    const tagElements = containerElement.getElementsByClassName(
      classTagName
    ) as HTMLCollectionOf<HTMLElement>;

    if (tagElements.length === 0) {
      console.log("No elements found with the provided class tag.");
      return [];
    }
    const tagElement = tagElements[0];
    const prevElements = [];
    let currentElement: HTMLElement | null = tagElement;
    while (currentElement) {
      currentElement =
        currentElement.previousElementSibling as HTMLElement | null;
      if (currentElement) {
        prevElements.push(currentElement);
      }
    }
    return prevElements;
  };

  const moveFirstElement2End = (
    elementContainer: HTMLElement,
    classElements: string
  ) => {
    const items = Array.from(elementContainer.querySelectorAll(classElements));

    if (items.length > 0) {
      const firstItem = items.slice(0, 1)[0];

      firstItem.remove();

      elementContainer.appendChild(firstItem);
    }
  };

  const moveLastElement2Start = (
    elementContainer: HTMLElement,
    classElements: string
  ) => {
    const items = Array.from(elementContainer.querySelectorAll(classElements));

    if (items.length > 0) {
      const lastItem = items[items.length - 1];

      lastItem.remove();

      elementContainer.insertBefore(lastItem, elementContainer.firstChild);
    }
  };

  useEffect(() => {
    handleResize();
  }, [clientWidth]);

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
            movies.length > 0 &&
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
          {movies.map((movie, index) => (
            <div
              key={`${genre_id}-slider-${movie.id}`}
              className={`carousel-img-container ${
                index === 0
                  ? "first"
                  : index === movies.length - 1
                  ? "last"
                  : ""
              }`}
              onMouseEnter={(event) => handleMouseEnter(event, movie)}
              onMouseLeave={handleMouseLeave}
            >
              <img src={urlPoster + movie.backdrop_path} />
              <h5>{movie.title}</h5>
            </div>
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
