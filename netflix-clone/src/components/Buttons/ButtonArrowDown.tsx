import { ButtonCircle } from "./CircleButtons/ButtonCircle";

interface ButtonArrowDownProps {
  tooltip?: boolean;
  tooltipText?: string;
  onClick?: () => void;
}

const svgArrow = (
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
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
    />
  </svg>
);

export const ButtonArrowDown: React.FC<ButtonArrowDownProps> = ({
  tooltip = false,
  tooltipText = "",
  onClick,
}) => {
  return (
    <ButtonCircle
      svgProp={svgArrow}
      textTooltip={tooltipText}
      showTooltip={tooltip}
      onClick={onClick}
      addClass="btn-arrowDown"
    />
  );
};
