import React, { useRef } from 'react'
import { useState, useEffect } from 'react'

// Recat Router
import { Link } from 'react-router-dom'

// Hooks
import { useSignup } from '../../Hooks/useSignup'

// Context
import { useGlobalContext } from '../../context/context'

export default function Signup () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [show, setShow] = useState(false)

  //const [toggleMode, setToggleMode] = useState('white')

  const { error, setError, isPending, signup } = useSignup()

  const { toggleMode, logPage, signPage } = useGlobalContext()

  const signPageInner = useRef(null)

  useEffect(() => {
    // Function for click event
    function handleOutsideClick (event) {
      if (
        signPage.current.contains(event.target) &&
        !signPageInner.current.contains(event.target)
      ) {
        //console.signPage('you just clicked outside of box!')
        signPage.current.style.opacity = '0'
        signPage.current.style.zIndex = '-1'
        signPage.current.style.transform = 'scale(0)'

        setDisplayName('')
        setEmail('')
        setPassword('')
        setError('')
      }
    }

    // Adding click event listener
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [signPage])

  const handleClick = () => {
    setShow(!show)
  }

  const showLog = () => {
    logPage.current.style.zIndex = '10'
    logPage.current.style.opacity = '1'
    logPage.current.style.transform = 'scale(1)'

    hideSign()
  }

  const hideSign = () => {
    signPage.current.style.zIndex = '-1'
    signPage.current.style.opacity = '0'
    signPage.current.style.transform = 'scale(0)'

    setDisplayName('')
    setEmail('')
    setPassword('')
    setError('')
  }

  const handleSubmit = e => {
    e.preventDefault()
    signup(
      displayName,
      email,
      password,
      setEmail,
      setPassword,
      setDisplayName,
      hideSign
    )
  }

  return (
    <div
      ref={signPage}
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
        <h4 onClick={hideSign} style={{ marginBottom: '1rem' }}>
          <i className='fa-solid fa-xmark fa-2x'></i>
        </h4>
      </Link>

      {/*<div
        className={
          toggleMode === 'white'
            ? 'login__title darkColor1'
            : 'login__title lightColor2'
        }
      >
        <h1>Moviefy</h1>
      </div>*/}

      <form
        ref={signPageInner}
        onSubmit={handleSubmit}
        className={
          toggleMode === 'white'
            ? 'login__form lightBg2'
            : 'login__form darkBg2'
        }
      >
        <h2 className={toggleMode === 'white' ? ' darkColor1' : ' lightColor2'}>
          Signup
        </h2>

        <label className='login__form-label'>
          <span
            className={
              toggleMode === 'white'
                ? 'login__form-label-name darkColor1'
                : 'login__form-label-name lightColor2'
            }
          >
            Name
          </span>
          <input
            className={
              toggleMode === 'white'
                ? 'login__form-label-input lightBg1'
                : 'login__form-label-input darkBg1'
            }
            type='text'
            onChange={e => setDisplayName(e.target.value)}
            value={displayName}
          />
        </label>

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
            Signup
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
            Signing in
          </button>
        )}

        <h5
          onClick={showLog}
          className={
            toggleMode === 'white'
              ? 'login__form-ask darkColor1'
              : 'login__form-ask lightColor2'
          }
        >
          Already have an account ?{' '}
          <Link
            to='#'
            className={
              toggleMode === 'white'
                ? 'login__form-ask-link darkColor1'
                : 'login__form-ask-link lightColor2'
            }
          >
            Login
          </Link>
        </h5>

        {error && (
          <h4
            className='login__form-error'
            style={{ color: 'tomato', fontWeight: '500' }}
          >
            {error}
          </h4>
        )}
      </form>
    </div>
  )
}
