import React from "react";
import closeIcon from "../images/close-icon.png";

function InfoTooltip({ isOpen, onClose, title, icon }) {
  const classOpenPopup = `${isOpen && "popup_opened"}`;

  return (
    <div className={`popup ${classOpenPopup}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__button-close-icon popup-icon-close-edit"
          onClick={onClose}
        >
          <img src={closeIcon} alt="иконка крестик" className="popup__close-icon"/>
        </button>
        <div className="popup__content">
          <img src={icon} alt="Статус-лого" className="popup__tool-icon" />
          <h2 className="popup__title">{title}</h2>
          </div>
      </div>
    </div>
  );
}

export default InfoTooltip;

