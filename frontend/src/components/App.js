import { useEffect, useState } from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import EditAvatarPopup from './EditAvatarPopup'
import EditProfilePopup from './EditProfilePopup'
import AddPlacePopup from './AddPlacePopup'
import ImagePopup from './ImagePopup'
import { api } from '../utils/Api'
import { currentUserContext } from '../contexts/CurrentUserContext'
import { LoggedContext } from '../contexts/LoggedContext'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { Register } from './Register'
import { Login } from './Login'
import { InfoTooltip } from './InfoTooltip'
import { ProtectedRoute } from './ProtectedRoute'
import * as auth from '../utils/auth'
import { PopupWithConfirm } from './PopupWithConfirm'

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentEmail, setCurrentEmail] = useState([])
  const [infoTooltip, setInfoTooltip] = useState(false)
  const [successfulReg, setSuccesfulReg] = useState(false)
  const [withConfirm, setWithConfirm] = useState({})
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const history = useNavigate()

useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([data, card]) => {
        setLoggedIn(true)
        setCurrentUser(data)
        setCards(card)
        history('/')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [loggedIn])

  useEffect(() => {
    auth
      .checkToken()
      .then((data) => {
        if(data) {
          setLoggedIn(true)
        setCurrentUser(data)
        setCurrentEmail(data.email)
        history('/')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [loggedIn])

  function handleDeleteConfirm(card) {
    setWithConfirm(card)
    setDeleteConfirm(true)
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false)
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setSelectedCard(null)
    setInfoTooltip(false)
    setDeleteConfirm(false)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleUpdateUser(newData) {
    api
      .setUserInfo(newData)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleUpdateAvatar(newData) {
    api
      .updateAvatar(newData)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id)

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        )
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((c) => (c._id !== card._id))
        )
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleAddPlaceSubmit(newData) {
    api
      .addNewCard(newData)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleSignOut() {
    auth
    .logOut()
    .then((res) => {
      setLoggedIn(false)
      history('/signin')
    })
  }

  function handleRegister({ email, password }) {
    auth
      .register(email, password)
      .then((res) => {
        if (res.statusCode !== 400) {
          setSuccesfulReg(true)
          history('/signin')
          setCurrentEmail(email)
        }
      })
      .catch((err) => {
        setSuccesfulReg(false)

        return console.log(err)
      })
      .finally(() => {
        setInfoTooltip(true)
      })
  }

  function handleAuthorize({ email, password }) {
    auth
      .authorize(email, password)
      .then(() => {
          setCurrentEmail(email)
          setLoggedIn(true)
          history('/')
      })
      .catch((err) => {
        setSuccesfulReg(false)
        setInfoTooltip(true)
        console.log(err)
      })
  }
 
  return (
    <currentUserContext.Provider value={currentUser}>
      <LoggedContext.Provider value={loggedIn}>
        <div className="body">
          <div className="page">
            <Header currentEmail={currentEmail} signOut={handleSignOut} />
            <Routes>
              <Route
                exact
                path="/"
                loggedIn={loggedIn}
                element={
                  <ProtectedRoute>
                    <Main
                      cards={cards}
                      onCardLike={handleCardLike}
                      onCardDelete={handleDeleteConfirm}
                      onEditAvatar={handleEditAvatarClick}
                      onEditProfile={handleEditProfileClick}
                      onAddPlace={handleAddPlaceClick}
                      onCardClick={handleCardClick}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/signup"
                element={<Register handleRegister={handleRegister} />}
              />
              <Route
                path="/signin"
                element={<Login handleAuthorize={handleAuthorize} />}
              />
              <Route
                path="*"
                element={
                  loggedIn ? <Navigate to="/" /> : <Navigate to="/signup" />
                }
              />
            </Routes>

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

            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            <InfoTooltip
              onClose={closeAllPopups}
              regStatus={successfulReg}
              isOpen={infoTooltip}
            />
            <PopupWithConfirm
              onClose={closeAllPopups}
              isOpen={deleteConfirm}
              confirm={handleCardDelete}
              card={withConfirm}
            />
          </div>
        </div>
      </LoggedContext.Provider>
    </currentUserContext.Provider>
  )
}

export default App
