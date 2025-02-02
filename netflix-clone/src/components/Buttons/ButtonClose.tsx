import "./ButtonClose.css";

interface ButtoncloseProps {
  tooltip?: boolean;
  tooltipText?: string;
  onClick?: () => void;
}

export const ButtonClose: React.FC<ButtoncloseProps> = ({
  tooltip = false,
  tooltipText = "",
  onClick,
}) => {
  return (
    <div className="btn-close">
      <button onClick={onClick}>
        {tooltip && <span className="tooltip">{tooltipText}</span>}
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
      </button>
    </div>
  );
};
