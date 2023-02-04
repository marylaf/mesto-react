import PopupWithForm from "./PopupWithForm";

function EditProfilePopup() {
  return (
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
  );
}

export default EditProfilePopup;
