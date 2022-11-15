import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="update-avatar"
      isOpen={isOpen}
      title="Обновить аватар"
      onClose={onClose}
      formName="edit"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        name="avatar"
        id="avatar-input"
        placeholder="Ссылка на аватарку"
        className="popup__input"
        ref={avatarRef}
        required
      />
      <span className="popup__input-error avatar-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
