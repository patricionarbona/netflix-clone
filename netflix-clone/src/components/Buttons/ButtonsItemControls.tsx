import "./ButtonsItemControls.css";
import { LikeGroupButton, ButtonAddList } from "../../components";

export const ButtonsItemControls = () => {
  return (
      <div className="buttonsItemControls">
        <div className="buttons-container">
          <div className="playOnly">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                role="img"
                viewBox="0 0 24 24"
                data-icon="PlayStandard"
                aria-hidden="true"
              >
                <path
                  d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>
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
