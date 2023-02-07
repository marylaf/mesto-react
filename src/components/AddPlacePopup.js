import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup({ isOpen, onClose, onUpdateCard }) {
  const nameInfo = React.useRef();
  const desInfo = React.useRef();

  function handleAddPlaceSubmit(e) {
    e.preventDefault();

    onUpdateCard({
      name: nameInfo.current.value,
      link: desInfo.current.value,
    });
    nameInfo.current.value = "";
    desInfo.current.value = "";
  }

  return (
    <PopupWithForm
      name="add-card"
      isOpen={isOpen}
      title="Новое место"
      saveText="Создать"
      onClose={onClose}
      onSubmit={handleAddPlaceSubmit}
    >
      <input
        placeholder=" Название"
        type="text"
        id="name-input"
        className="popup__info popup__info_form_name"
        name="info-name"
        minLength="2"
        maxLength="30"
        ref={nameInfo}
        required
      />
      <span className="span name-input-error"></span>
      <input
        placeholder=" Ссылка на картинку"
        type="url"
        className="popup__info popup__info_form_link"
        name="info-link"
        id="link-input"
        ref={desInfo}
        required
      />
      <span className="span link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
