import { ButtonCircle } from "./CircleButtons/ButtonCircle";

interface ButtoncloseProps {
  tooltip?: boolean;
  tooltipText?: string;
  onClick?: () => void;
}

const svgClose = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M6 18 18 6M6 6l12 12"
    />
  </svg>
);

export const ButtonClose: React.FC<ButtoncloseProps> = ({
  tooltip = false,
  tooltipText = "",
  onClick,
}) => {
  return (
    <ButtonCircle
      svgProp={svgClose}
      addClass="btn-close"
      textTooltip={tooltipText}
      onClick={onClick}
      showTooltip={tooltip}
    />
  );
};
