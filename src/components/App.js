import { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setСurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then((res) => {
        setСurrentUser(res[0]);
        setCards(res[1]);
      })
      .catch();
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function deleteCardClick(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((i) => i._id !== card._id));
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    api.changeLikeStatus(card._id, isLiked).then((newCard) => {
      setCards((state) =>
        state.map((like) => (like._id === card._id ? newCard : like))
      );
    });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
  }

  return (
    <body className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onDeleteClick={deleteCardClick}
          onCardLike={handleCardLike}
          cards={cards}
        />
        <Footer />
        <PopupWithForm
          name="add-card"
          isOpen={isAddPlacePopupOpen}
          title="Новое место"
          saveText="Создать"
          onClose={closeAllPopups}
        >
          <input
            placeholder=" Название"
            type="text"
            id="name-input"
            className="popup__info popup__info_form_name"
            name="info-name"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="span name-input-error"></span>
          <input
            placeholder=" Ссылка на картинку"
            type="url"
            className="popup__info popup__info_form_link"
            name="info-link"
            id="link-input"
            required
          />
          <span className="span link-input-error"></span>
        </PopupWithForm>
        <PopupWithForm
          name="avatar"
          isOpen={isEditAvatarPopupOpen}
          title="Обновить аватар"
          saveText="Сохранить"
          onClose={closeAllPopups}
        >
          <input
            placeholder=" Ссылка на картинку"
            type="url"
            className="popup__info popup__info_form_avatar"
            name="info-link"
            id="avatar-input"
            required
          />
          <span className="span avatar-input-error"></span>
        </PopupWithForm>
        <ImagePopup
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </body>
  );
}

export default App;
