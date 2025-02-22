import { ButtonCircle } from "./ButtonCircle";

const svgCheck = (
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
      d="m4.5 12.75 6 6 9-13.5"
    />
  </svg>
);

export const ButtonCheck = ({ onClick }: { onClick: () => void }) => {
  return (
    <ButtonCircle
      svgProp={svgCheck}
      addClass="btn-check"
      showTooltip={false}
      onClick={onClick}
    />
  );
};
