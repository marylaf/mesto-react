import { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

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

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
  }

  return (
    <body className="page">
      <Header />
      <Main
        isEditAvatarPopupOpen={isEditAvatarPopupOpen}
        isAddPlacePopupOpen={isAddPlacePopupOpen}
        isEditProfilePopupOpen={isEditProfilePopupOpen}
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        name="user-info"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        title="Редактировать профиль"
        saveText="Сохранить"
      >
        <input
          type="text"
          className="popup__info popup__info_form_title"
          id="title-input"
          placeholder="Имя"
          name="name"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="span title-input-error"></span>
        <input
          type="text"
          className="popup__info popup__info_form_subtitle"
          id="subtitle-input"
          name="about"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="span subtitle-input-error"></span>
      </PopupWithForm>
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
    </body>
  );
}

export default App;
