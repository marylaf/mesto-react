import React from "react";

function Card({ onCardClick, card }) {
  function handleCardClick() {
    onCardClick(card);
  }

  return (
    <article className="card" key={card.key}>
      <button
        className="popup__button-trash"
        aria-label="Удаление карточки"
        type="button"
      ></button>
      <img
        className="elements__image"
        src={card.link}
        alt="храм"
        onClick={handleCardClick}
      />
      <div className="elements__block">
        <h2 className="elements__name">{card.name}</h2>
        <div className="elements__block-like">
          <button
            type="button"
            className="elements__button"
            aria-label="Добавление лайка"
          ></button>
          <span className="elements__button-count"></span>
        </div>
      </div>
    </article>
  );
}

export default Card;
