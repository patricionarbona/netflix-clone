import "./ButtonsItemControls.css";
import { LikeGroupButton, ButtonAddList, ButtonPlayCirc } from "../../components";

export const ButtonsItemControls = () => {
  return (
      <div className="buttonsItemControls">
        <div className="buttons-container">
          <ButtonPlayCirc />
          <ButtonAddList showTooltip={true}/>
          <LikeGroupButton />
        </div>
        <div className="moreInfo">
          <button>
            <span className="tooltip">Episodios e información</span>
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
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
        </div>
      </div>
  );
};
