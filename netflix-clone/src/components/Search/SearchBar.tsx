import { useRef, useState } from "react";
import "./SearchBar.css";

const svgLupa = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    role="img"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    data-icon="MagnifyingGlassStandard"
    aria-hidden="true"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10ZM15.6177 17.0319C14.078 18.2635 12.125 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 12.125 18.2635 14.078 17.0319 15.6177L22.7071 21.2929L21.2929 22.7071L15.6177 17.0319Z"
      fill="currentColor"
    ></path>
  </svg>
);

const svgClose = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18 18 6M6 6l12 12"
    />
  </svg>
);

export const SearchBar = () => {
  const searchRef = useRef<HTMLDivElement>(null);
  const [expandSearch, setExpandSearch] = useState(false);
  const [hasText, setHasText] = useState(false);

  // limpiar al perder focus
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!hasText) {
      e.target.value = "";
      setExpandSearch(false);
      return;
    }
    const search = searchRef.current;
    if (!search) return;
    const input = search.querySelector(".search-input") as HTMLInputElement;
    input?.focus();

  };

  const handleClickShow = () => {
    const search = searchRef.current;
    if (!search) return;

    setExpandSearch(true);

    const input = search.querySelector(".search-input") as HTMLInputElement;
    input?.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasText(e.target.value.trim().length > 0);
  };

  const handleClickDelete = () => {
    const search = searchRef.current;
    if (!search) return;

    const input = search.querySelector(".search-input") as HTMLInputElement;
    input?.focus();
    input.value = "";
    setHasText(false);
  };

  return (
    <div
      className={`search-bar ${expandSearch ? "active" : ""}`}
      ref={searchRef}
    >
      <button className="search-submit" onClick={handleClickShow}>
        {svgLupa}
      </button>
      <input
        type="text"
        name=""
        id=""
        placeholder="Títulos, personas, géneros"
        className="search-input"
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <button
        className={`search-delete ${hasText ? "active" : ""}`}
        onClick={handleClickDelete}
      >
        {svgClose}
      </button>
    </div>
  );
};
