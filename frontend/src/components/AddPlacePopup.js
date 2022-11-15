import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [name, setName] = useState("");
    const [link, setLink] = useState("");
  
  	useEffect(() => {
        setName("");
        setLink("");
      }, [isOpen]);

	  function handleNameChange(e) {
      setName(e.target.value);
    }

    function handleLinkChange(e) {
      setLink(e.target.value);
    }
  
    function handleSubmit(e) {
      e.preventDefault();

      onAddPlace({
        name: name,
        link: link,
      });
    }

  return (
    <PopupWithForm
      name="create"
      isOpen={isOpen}
      title="Новое место"
      onClose={onClose}
      formName="create"
      buttonText="Создать"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        id="place-name-input"
        placeholder="Название"
        className="popup__input popup__input-error_margin-bottom"
        minLength="2"
        maxLength="30"
        value={name || ''}
        onChange={handleNameChange}
        required
      />
      <span className="popup__input-error"></span>
      <input
        type="url"
        name="link"
        id="link-input"
        placeholder="Ссылка на картинку"
        className="popup__input"
        value={link || ''}
        onChange={handleLinkChange}
        required
      />
      <span className="popup__input-error link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;