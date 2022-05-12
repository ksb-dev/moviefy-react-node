import React from 'react'
import { useState, useEffect } from 'react'

// Recat Router
import { Link, useNavigate } from 'react-router-dom'

// Hooks
import { useSignup } from '../../Hooks/useSignup'

// Context
import { useGlobalContext } from '../../context/context'

import { motion } from 'framer-motion'

export default function Signup () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [show, setShow] = useState(false)

  const { error, isPending, signup } = useSignup()

  const { user, toggleMode, loadMovies } = useGlobalContext()

  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      localStorage.removeItem('term')
      localStorage.setItem('mode', 'white')
      localStorage.setItem('genre', 'All')
      localStorage.setItem('page', 1)
      localStorage.setItem('category', 'popular')
      localStorage.setItem('activeGenre', 0)
      loadMovies('popular', 1)
      //setSearchedMovies([])
      //setSearchTerm('')
      navigate('/')

      //window.location.reload()
    }
  }, [user, navigate, loadMovies])

  const handleSubmit = e => {
    e.preventDefault()
    signup(displayName, email, password)
  }

  const handleClick = () => {
    setShow(!show)
  }

  return (
    <div
      className={toggleMode === 'white' ? 'login lightBg2' : 'login darkBg2'}
    >
      <Link
        to='/'
        className={
          toggleMode === 'white'
            ? 'login__back darkColor1'
            : 'login__back lightColor1'
        }
      >
        <motion.h4
          initial={{ x: '100vw' }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, duration: 0.2 }}
        >
          <i className='fa-solid fa-arrow-left'></i> Back to home
        </motion.h4>
      </Link>

      <motion.div
        initial={{ x: '-100vw' }}
        animate={{ x: 0 }}
        transition={{ delay: 0.2, duration: 0.2 }}
        className={
          toggleMode === 'white'
            ? 'login__title darkColor1'
            : 'login__title lightColor1'
        }
      >
        <h1>Moviefy</h1>
      </motion.div>

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        onSubmit={handleSubmit}
        className={
          toggleMode === 'white'
            ? 'login__form lightBg1'
            : 'login__form darkBg1'
        }
      >
        <h2 className={toggleMode === 'white' ? ' darkColor1' : ' lightColor1'}>
          Signup
        </h2>

        <label className='login__form-label'>
          <span
            className={
              toggleMode === 'white'
                ? 'login__form-label-name darkColor1'
                : 'login__form-label-name lightColor1'
            }
          >
            Name
          </span>
          <input
            className={
              toggleMode === 'white'
                ? 'login__form-label-input lightBg2'
                : 'login__form-label-input darkBg2'
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
                : 'login__form-label-email lightColor1'
            }
          >
            Email
          </span>
          <input
            className={
              toggleMode === 'white'
                ? 'login__form-label-input lightBg2'
                : 'login__form-label-input darkBg2'
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
                  : 'login__form-label-password lightColor1'
              }
            >
              Password
            </span>
            {password && !show && (
              <i
                className={
                  toggleMode === 'white'
                    ? 'fa-regular fa-eye eye darkColor1'
                    : ' fa-regular fa-eye eye lightColor1'
                }
                onClick={handleClick}
              ></i>
            )}
            {password && show && (
              <i
                className={
                  toggleMode === 'white'
                    ? 'fa-regular fa-eye-slash eye darkColor1'
                    : 'fa-regular fa-eye-slash eye lightColor1'
                }
                onClick={handleClick}
              ></i>
            )}
          </div>

          <input
            className={
              toggleMode === 'white'
                ? 'login__form-label-input lightBg2'
                : 'login__form-label-input darkBg2'
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
                ? 'login__form-btn darkBg2 lightColor1'
                : 'login__form-btn lightBg1 darkColor1'
            }
          >
            Signup
          </button>
        )}

        {isPending && (
          <button
            className={
              toggleMode === 'white'
                ? 'login__form-btn darkBg2 lightColor1'
                : 'login__form-btn lightBg1 darkColor1'
            }
          >
            Signing in
          </button>
        )}

        <h5
          className={
            toggleMode === 'white'
              ? 'login__form-ask darkColor1'
              : 'login__form-ask lightColor1'
          }
        >
          Already have an account ?{' '}
          <Link
            to='/login'
            className={
              toggleMode === 'white'
                ? 'login__form-ask-link darkColor1'
                : 'login__form-ask-link lightColor1'
            }
          >
            Login
          </Link>
        </h5>

        {error && (
          <h4 className='login__form-error' style={{ color: 'tomato' }}>
            {error}
          </h4>
        )}
      </motion.form>
    </div>
  )
}
