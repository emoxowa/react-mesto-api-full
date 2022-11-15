import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ card, isOpen, onClose, onCardDelete }) {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onCardDelete(card);
  };

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      buttonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}

export default DeleteCardPopup;
