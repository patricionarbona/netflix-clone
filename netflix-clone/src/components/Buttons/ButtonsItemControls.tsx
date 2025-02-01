import "./ButtonsItemControls.css";
import { LikeGroupButton, ButtonAddList, ButtonPlayCirc, ButtonArrowDown } from "../../components";

export const ButtonsItemControls = () => {
  return (
      <div className="buttonsItemControls">
        <div className="buttons-container">
          <ButtonPlayCirc />
          <ButtonAddList showTooltip={true}/>
          <LikeGroupButton />
        </div>
        <div className="moreInfo">
          <ButtonArrowDown tooltip={true} tooltipText="Episodios e información" />
        </div>
      </div>
  );
};
