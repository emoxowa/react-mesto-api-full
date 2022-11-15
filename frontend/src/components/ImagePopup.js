import React from "react";
import closeIcon from "../images/close-icon.png";

function ImagePopup({ card, isOpen, onClose }) {
  const classOpenPopup = `${isOpen && "popup_opened"}`;

  return (
    <div className={`popup popup-${card.name} ${classOpenPopup}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__button-close-icon popup-icon-close-image"
          onClick={onClose}
        >
          <img
            src={closeIcon}
            alt="иконка крестик"
            className="popup__close-icon"
          />
        </button>
        <img src={card.link} alt={card.name} className="popup__image" />
        <p className="popup__caption">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;