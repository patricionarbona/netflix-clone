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
            {index !== 0 ? (
              <span
                key={index}
                className="genreList-separator"
              ></span>
            ) : (
              <></>
            )}
            <span key={`genero-name-${index}`}>{genero.name}</span>
          </>
        ))}
      </div>
    </>
  );
};
