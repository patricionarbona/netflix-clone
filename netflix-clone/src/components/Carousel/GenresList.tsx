import "./GenresList.css";

interface Genero {
  id: number;
  name: string;
}

export const GenresList = ({ genres }: { genres: Genero[] }) => {
  return (
    <>
        <div className="genresList">
          {genres.map((genero, index) => (
            <>
                {index !== 0 ? 
                    <span
                        key={`genreList-separato${index}`}
                        className="genreList-separator"
                    ></span>
                    : <></>
                }
              <span key={`genreList-item-${index}`}>{genero.name}</span>
            </>
          ))}
        </div>
    </>
  );
};
