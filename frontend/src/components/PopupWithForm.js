import React from "react";
import closeIcon from "../images/close-icon.png";

function PopupWithForm(props) {
  const classOpenPopup = `${props.isOpen && "popup_opened"}`;

  return (
    <div className={`popup popup-${props.name} ${classOpenPopup}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__button-close-icon popup-icon-close-edit"
          onClick={props.onClose}
        >
          <img
            src={closeIcon}
            alt="иконка крестик"
            className="popup__close-icon"
          />
        </button>
        <form
          action="#"
          name={props.formName}
          className="popup__form"
          onSubmit={props.onSubmit}
        >
          <div className="popup__content">
            <h2 className="popup__title">{props.title}</h2>
            <div>{props.children}</div>
            <button
              type="submit"
              className="button popup__button button_type_save"
            >
              {props.buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;