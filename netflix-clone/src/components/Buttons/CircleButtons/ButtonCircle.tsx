import "./ButtonCircle.css";

export const ButtonCircle = ({
  addClass = "",
  showTooltip = true,
  textTooltip,
  svgProp,
  onClick,
}: {
  addClass?: string;
  showTooltip?: boolean;
  textTooltip: string;
  svgProp: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div className={`btn-circle ${addClass}`} onClick={onClick}>
      <button>
        {showTooltip && <span className="tooltip">{textTooltip}</span>}
        {svgProp}
      </button>
    </div>
  );
};
