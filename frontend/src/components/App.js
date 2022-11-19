
import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";

import { api } from "../utils/Api";
import * as auth from "../utils/auth.js";

import CurrentUserContext from "../contexts/CurrentUserContext";

import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";

import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

import successIcon from '../images/successIcon.png'
import failIcon from '../images/failIcon.png'

function App() {
  const [isEditAvatarPopupOpen, setIsPopupAvatarOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsPopupProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsPopupAddPlaceOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardDelete, setCardDelete] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState("");
  const [dataInfoTool, setDataInfoTool] = useState({ title: "", icon: "", });

  const history = useHistory();

  function handleEditAvatarClick() {
    setIsPopupAvatarOpen(true);
  }

  function handleEditProfileClick() {
    setIsPopupProfileOpen(true);
  }

  function handleAddPlaceClick() {
    setIsPopupAddPlaceOpen(true);
  }

  function handleDeleteCardClick(card) {
    setDeleteCardPopupOpen(true);
    setCardDelete(card);
  }

  const handleCardClick = (card) => {
    setImagePopupOpen(true);
    setSelectedCard(card);
  };

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }
  
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    console.log(card.likes);
    console.log(currentUser._id);
    console.log(isLiked);
    console.log(card._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeStatus(isLiked, card._id)
      .then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    })
      .catch((err) => { console.log(`Error ${err}`); })
  } 

  function handleCardDelete(card) {
    api
      .deleteCardFromServer(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
    })
      .catch((err) => { console.log(`Error ${err}`); })
  }

  function handleUpdateUser({ name, job }) {
    api
      .setUserInfoFromServer({ name, job })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Error ${err}`);
      });
  }

  function handleUpdateAvatar({ avatar }) {
     api
       .changeUserAvatar({ avatar })
       .then((res) => {
         setCurrentUser(res);
         closeAllPopups();
       })
       .catch((err) => console.log(`Error ${err}`));
   }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .setCardToServer({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error ${err}`));
  }
  
  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((data) => {
        history.push("/sign-in");
        setDataInfoTool({
          title: "Вы успешно зарегистрировались!",
          icon: successIcon,
        });
        handleInfoTooltipOpen();
      })
      .catch((err) => {
        console.error(`Error ${err}`);
        setDataInfoTool({
          title: "Что-то пошло не так! Попробуйте ещё раз.",
          icon: failIcon,
        });
        handleInfoTooltipOpen();
      });
  }
  
  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        setUserData(email);
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
        history.push("/");
      })
      .catch((err) => {
        setDataInfoTool({
          title: "Что-то пошло не так! Попробуйте ещё раз.",
          icon: failIcon,
        });
        console.error(`Error ${err}`);
        handleInfoTooltipOpen();
      });
  }

  function closeAllPopups() {
    setIsPopupAvatarOpen(false);
    setIsPopupProfileOpen(false);
    setIsPopupAddPlaceOpen(false);
    setImagePopupOpen(false);
    setSelectedCard(false);
    setDeleteCardPopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function onSignOut() {
    setLoggedIn(false);
    setUserData("");
    localStorage.removeItem("token");
    history.push("/sign-in");
  }
  
  function checkToken() {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserData(res.email);
            history.push("/");
          } else {
            setDataInfoTool({
              title: "Что-то пошло не так! Попробуйте ещё раз.",
              icon: failIcon,
            });
            handleInfoTooltipOpen();
          }
        })
        .catch((err) => console.log(`Error ${err}`));
    }
  }

  useEffect(() => {
    checkToken();

    const promises = [
      api.getUserInfoFromServer(),
      api.getInitialCardsFromServer(),
    ];

    Promise.all(promises)
      .then(([user, dataCards]) => {
        setCurrentUser(user);
        setCards(dataCards);
      })
      .catch((err) => console.log(`Error ${err}`));
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header headerEmail={userData} onSignOut={onSignOut} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCardClick}
            cards={cards}
          ></ProtectedRoute>

          <Route path="/sign-up">
            <Register handleRegister={handleRegister} />
          </Route>

          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>

          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          card={cardDelete}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          title={dataInfoTool.title}
          icon={dataInfoTool.icon}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
