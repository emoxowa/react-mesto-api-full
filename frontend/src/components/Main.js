import React, { useContext } from "react";
import pencil from "../images/Pencil.svg";
import plus from "../images/Plus.svg";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onAddPlace,
  onEditProfile,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__wrapper">
          <div className="profile__avatar-container" onClick={onEditAvatar}>
            <button
              className="profile__avatar-edit-button"
              type="button"
            ></button>
            <img
              src={currentUser.avatar}
              alt="аватар"
              className="profile__avatar"
            />
          </div>
          <div className="profile__info">
            <div className="profile__name-edit">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                type="button"
                className="button button_type_edit"
                onClick={onEditProfile}
              >
                <img src={pencil} alt="карандаш" />
              </button>
            </div>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="button button_type_add"
          onClick={onAddPlace}
        >
          <img src={plus} alt="плюс" />
        </button>
      </section>
      <section className="cards">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
