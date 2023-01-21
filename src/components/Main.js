import React, { useEffect, useState } from "react";
import { api } from "../utils/Api";
import Card from "./Card";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then((res) => {
        setUserDescription(res[0].about);
        setUserAvatar(res[0].avatar);
        setUserName(res[0].name);
        setCards(res[1]);
      })
      .catch();
  }, [onEditProfile, onEditAvatar]);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__people">
            <div className="profile__avatar-pen" onClick={onEditAvatar}>
              <img className="profile__avatar" src={userAvatar} alt="портрет" />
            </div>
            <div className="profile__info">
              <h1 className="profile__title">{userName}</h1>
              <p className="profile__subtitle">{userDescription}</p>
              <button
                onClick={onEditProfile}
                type="button"
                aria-label="Редактирование профиля"
                className="profile__pencil"
              ></button>
            </div>
          </div>
          <button
            type="button"
            onClick={onAddPlace}
            aria-label="Создание новой карточки"
            className="profile__button"
          ></button>
        </div>
      </section>
      <section className="elements">
        <div className="elements__container">
          {cards.map((card) => (
            <Card
              card={card}
              title={card.name}
              image={card.link}
              key={card._id}
              onCardClick={onCardClick}
              likesCount={card.likes.length}
            />
          ))}
        </div>
      </section>
      <div className="popup popup-confirmation">
        <div className="popup__container">
          <button
            className="popup__button-drop"
            aria-label="Закрытие попапа"
            type="button"
          ></button>
          <h3 className="popup__correct">Вы уверены?</h3>
          <form name="popup__form" className="popup__form" noValidate>
            <input
              type="submit"
              className="popup__button-save popup__button-save_type_confirmation"
              value="Да"
            />
          </form>
        </div>
      </div>
    </main>
  );
}

export default Main;
