import './PopularContent.css'
import { Movie, TVShow } from "../../interfaces";

interface PopularContentProps {
  NumberPop: number;
  contentData: Movie | TVShow;
  nameClass: string;
}

const urlPoster = "https://image.tmdb.org/t/p/original/";

export const PopularContent: React.FC<PopularContentProps> = ({
  NumberPop,
  contentData,
  nameClass,
}) => {
  const svgNumber = (number: number) => {
    return (
      <svg
  width="100%"
  height="100%"
  viewBox="0 0 100 80"
  xmlns="http://www.w3.org/2000/svg"
>
  <text
    x="50"
    y="80"
    fontSize="100"
    fontFamily="Arial"
    fontWeight="bold"
    stroke="gray"
    stroke-width="5"
    fill="black"
    text-anchor="middle"
  >
    {number}
  </text>
</svg>

    );
  };

  return (
    <>
      <div className={nameClass + ' popular-wrapper'}>
        <div className="carousel-popular-svg">{svgNumber(NumberPop)}</div>
        <div className="carousel-popular-content">
          <img src={urlPoster + contentData.poster_path} alt="" />
          <h5>
            {"title" in contentData ? contentData.title : contentData.name}
          </h5>
        </div>
      </div>
    </>
  );
};
