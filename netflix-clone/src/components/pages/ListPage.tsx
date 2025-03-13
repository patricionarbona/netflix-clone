import "./ListPage.css";
import { useEffect, useRef, useState } from "react";
import { fetchMovieByName, fetchTVByName } from "../../services/fetchs";
import { useGlobalContext } from "../../context/global.context";
import { Media, Movie, TVShow } from "../../interfaces";

const urlPoster = "https://image.tmdb.org/t/p/original/";

export const ListPage = () => {
  const {
    query,
    setContentPicked,
    setContentPickedPos,
    isResizing,
    setShowHover,
  } = useGlobalContext();
  const [mediaContent, setMediaContent] = useState<Media[]>();
  const timerHoverRef = useRef(-1);

  const fetchQuerys = async (query: string) => {
    try {
      const [movieData, tvData] = await Promise.all([
        fetchMovieByName(query),
        fetchTVByName(query),
      ]);
      console.log(movieData);
      console.log(tvData);
      const combineMedia: Media[] = [...movieData, ...tvData];
      setMediaContent(combineMedia);
    } catch (error) {
      console.log("error en searchBar: ", error);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>, media: Media) => {
    if (isResizing) return;

    console.log(media);
    const newMedia = "title" in media ? (media as Movie) : (media as TVShow);

    timerHoverRef.current = setTimeout(() => {
      setContentPicked(newMedia);
      setShowHover(true);
      const htmlTarget = e.target as HTMLElement;
      const htmlPos = htmlTarget.getBoundingClientRect();
      setContentPickedPos({
        x: htmlPos.x,
        y: htmlPos.y + window.scrollY,
        width: htmlPos.width,
        height: htmlPos.height,
      });
    }, 750);
  };

  const handleMouseLeave = () => {
    clearTimeout(timerHoverRef.current);
  };

  useEffect(() => {
    if (!(query.length > 0)) {
      return;
    }
    fetchQuerys(query);
  }, [query]);

  return (
    <>
      <div className="listPage-container">
        {mediaContent?.map((media, index) => (
          <img
            key={`media-${index}`}
            src={urlPoster + media.poster_path}
            onMouseEnter={(event) => handleMouseEnter(event, media)}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </div>
    </>
  );
};
