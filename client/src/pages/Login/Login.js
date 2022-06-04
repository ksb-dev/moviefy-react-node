import React, { useRef } from 'react'
import { useState, useEffect } from 'react'

// Recat Router
import { Link } from 'react-router-dom'

// Hooks
import { useLogin } from '../../Hooks/useLogin'

// Context
import { useGlobalContext } from '../../context/context'

// Components
import Signup from '../Signup/Signup'

export default function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)

  const { error, setError, isPending, login } = useLogin()

  const { toggleMode, logPage, signPage } = useGlobalContext()

  const logPageInner = useRef(null)

  useEffect(() => {
    // Function for click event
    function handleOutsideClick (event) {
      if (
        logPage.current.contains(event.target) &&
        !logPageInner.current.contains(event.target)
      ) {
        //console.logPage('you just clicked outside of box!')
        logPage.current.style.opacity = '0'
        logPage.current.style.zIndex = '-1'
        logPage.current.style.transform = 'scale(0)'

        setEmail('')
        setPassword('')
        setError('')
      }
    }

    // Adding click event listener
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [logPage])

  const handleClick = () => {
    setShow(!show)
  }

  const hideLog = () => {
    logPage.current.style.zIndex = '-1'
    logPage.current.style.opacity = '0'
    logPage.current.style.transform = 'scale(0)'

    setEmail('')
    setPassword('')
    setError('')
  }

  const showSign = () => {
    signPage.current.style.zIndex = '10'
    signPage.current.style.opacity = '1'
    signPage.current.style.transform = 'scale(1)'

    hideLog()
  }

  const handleSubmit = e => {
    e.preventDefault()
    login(email, password, setEmail, setPassword, hideLog)
  }

  return (
    <>
      <div
        ref={logPage}
        className={
          toggleMode === 'white' ? 'login alphaLightBg2' : 'login alphaDarkBg2'
        }
      >
        <Link
          to='#'
          className={
            toggleMode === 'white'
              ? 'login__back darkColor1'
              : 'login__back lightColor2'
          }
        >
          <h4 onClick={hideLog} style={{ marginBottom: '1rem' }}>
            <i className='fa-solid fa-xmark fa-2x'></i>
          </h4>
        </Link>

        <form
          ref={logPageInner}
          onSubmit={handleSubmit}
          className={
            toggleMode === 'white'
              ? 'login__form lightBg2'
              : 'login__form darkBg2'
          }
        >
          <h2
            className={toggleMode === 'white' ? 'darkColor1' : ' lightColor2'}
          >
            Login
          </h2>

          <label className='login__form-label'>
            <span
              className={
                toggleMode === 'white'
                  ? 'login__form-label-email darkColor1'
                  : 'login__form-label-email lightColor2'
              }
            >
              Email
            </span>
            <input
              className={
                toggleMode === 'white'
                  ? 'login__form-label-input lightBg1'
                  : 'login__form-label-input darkBg1'
              }
              type='email'
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
          </label>

          <label className='login__form-label'>
            <div className='login__form-label-content'>
              <span
                className={
                  toggleMode === 'white'
                    ? 'login__form-label-password darkColor1'
                    : 'login__form-label-password lightColor2'
                }
              >
                Password
              </span>

              {password && !show && (
                <i
                  className={
                    toggleMode === 'white'
                      ? 'fa-regular fa-eye eye darkColor1'
                      : ' fa-regular fa-eye eye lightColor2'
                  }
                  onClick={handleClick}
                ></i>
              )}

              {password && show && (
                <i
                  className={
                    toggleMode === 'white'
                      ? 'fa-regular fa-eye-slash eye darkColor1'
                      : 'fa-regular fa-eye-slash eye lightColor2'
                  }
                  onClick={handleClick}
                ></i>
              )}
            </div>

            <input
              className={
                toggleMode === 'white'
                  ? 'login__form-label-input lightBg1'
                  : 'login__form-label-input darkBg1'
              }
              type={show ? 'text' : 'password'}
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
          </label>

          {!isPending && (
            <button
              className={
                toggleMode === 'white'
                  ? 'login__form-btn darkBg1 lightColor2'
                  : 'login__form-btn lightBg2 darkColor1'
              }
            >
              Login
            </button>
          )}

          {isPending && (
            <button
              className={
                toggleMode === 'white'
                  ? 'login__form-btn darkBg1 lightColor2'
                  : 'login__form-btn lightBg2 darkColor1'
              }
            >
              Loggging in
            </button>
          )}

          <h5
            onClick={showSign}
            className={
              toggleMode === 'white'
                ? 'login__form-ask darkColor1'
                : 'login__form-ask lightColor2'
            }
          >
            Don't have an account ?{' '}
            <Link
              to='#'
              className={
                toggleMode === 'white'
                  ? 'login__form-ask-link darkColor1'
                  : 'login__form-ask-link lightColor2'
              }
            >
              Signup
            </Link>
          </h5>

          {error && (
            <h4
              className='login__form-error'
              style={{
                color: 'tomato',
                fontWeight: '500'
              }}
            >
              {error}
            </h4>
          )}
        </form>
      </div>

      <Signup />
    </>
  )
}
