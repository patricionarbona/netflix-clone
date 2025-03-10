import { useEffect, useState } from "react";
import { fetchMovieByName, fetchTVByName } from "../../services/fetchs";
import { useGlobalContext } from "../../context/global.context";
import { Media} from "../../interfaces";

const urlPoster = "https://image.tmdb.org/t/p/original/";


export const ListPage = () => {
  const { query } = useGlobalContext();
  const [mediaContent, setMediaContent] = useState<Media[]>()

  const fetchQuerys = async (query: string) => {
    try {
      const [movieData, tvData] = await Promise.all([
        fetchMovieByName(query),
        fetchTVByName(query),
      ]);
      console.log(movieData);
      console.log(tvData);
      const combineMedia: Media[] = [...movieData, ...tvData] 
      setMediaContent(combineMedia);
    } catch (error) {
      console.log("error en searchBar: ", error);
    }
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
        {mediaContent?.map((media,index) => ( 
            <img key={`media-${index}`} src={urlPoster + media.backdrop_path}/>
        ))
        }
        </div>
    </>
  );
};
