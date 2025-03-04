import { ButtonCircle } from "./CircleButtons/ButtonCircle";

const svgRestart = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    role="img"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    data-icon="RefreshStandard"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.6625 7C18.9328 4.00995 15.7002 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12H24C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C16.1752 0 19.8508 2.13204 22 5.36482V2H24V8C24 8.55228 23.5523 9 23 9H17V7H20.6625Z"
      fill="currentColor"
    ></path>
  </svg>
);

export const ButtonRestart = ({ onClick }: { onClick: () => void }) => {
  return (
    <ButtonCircle
      svgProp={svgRestart}
      showTooltip={false}
      addClass="btn-restart"
      onClick={onClick}
    />
  );
};
