import {useEffect, useState} from 'react'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [avatar, setAvatar] = useState('')
  const [values, setValues] = useState('')

  useEffect(() => {
    setAvatar('')
    setValues('')
  }, [isOpen])

  const handleChange = (evt) => {
    const { name, value } = evt.target
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    const { avatar } = values
    onUpdateAvatar({
      avatar,
    })
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      container="popup__container"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <section className="popup__section-avatar" aria-label="строка ввода">
        <input
          id="avatar"
          type="url"
          className="popup__input popup__input_link"
          name="avatar"
          placeholder="Ссылка на картинку"
          required
          onChange={handleChange}
          value={values.avatar || ''}
        />
        <span className="popup__input-error" id="avatar-error"></span>
      </section>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
