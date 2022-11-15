import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: name,
      job: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      isOpen={isOpen}
      title="Редактировать профиль"
      onClose={onClose}
      formName="edit"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        id="name-input"
        className="popup__input popup__input-error_margin-bottom"
        minLength="2"
        maxLength="40"
        placeholder="Имя"
        onChange={handleNameChange}
        value={name || ""}
        required
      />
      <span className="popup__input-error"></span>
      <input
        type="text"
        name="job"
        id="job-input"
        className="popup__input"
        minLength="2"
        maxLength="200"
        placeholder="О себе"
        onChange={handleDescriptionChange}
        value={description || ""}
        required
      />
      <span className="popup__input-error job-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
