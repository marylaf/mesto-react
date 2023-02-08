import { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { api } from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithConfirmation from "./PopupWithConfirmation";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then((res) => {
        setCurrentUser(res[0]);
        setCards(res[1]);
      })
      .catch(console.log("Ошибка"));
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleConfirmationClick(card) {
    setIsConfirmationPopupOpen(true);
    setSelectedCard(card);
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
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((i) => i._id !== card._id));
      })
      .then(() => closeAllPopups())
      .catch(console.log("Ошибка"));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    api
      .changeLikeStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((like) => (like._id === card._id ? newCard : like))
        );
      })
      .catch(console.log("Ошибка"));
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmationPopupOpen(false);
  }

  function handleUpdateUser(data) {
    api
      .editProfile(data.name, data.about)
      .then((userData) => setCurrentUser(userData))
      .then(() => closeAllPopups())
      .catch(console.log("Ошибка"));
  }

  function handleUpdateAvatar(data) {
    api
      .addNewAvatar(data.avatar)
      .then((userData) => setCurrentUser(userData))
      .then(() => closeAllPopups())
      .catch(console.log("Ошибка"));
  }

  function handleUpdateCards(data) {
    api
      .addNewCard(data.name, data.link)
      .then((newCard) => setCards([newCard, ...cards]))
      .then(() => closeAllPopups())
      .catch(console.log("Ошибка"));
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onDeleteClick={handleConfirmationClick}
          onCardLike={handleCardLike}
          cards={cards}
        />
        <Footer />
        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdateCard={handleUpdateCards}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <PopupWithConfirmation
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
          onSubmitDeleteCard={deleteCardClick}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
