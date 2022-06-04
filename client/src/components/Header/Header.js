import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Context
import { useGlobalContext } from '../../context/context'

// Components
import Logout from '../Logout/Logout'
import SideNavigation from '../SideNavigation/SideNavigation'

const Header = () => {
  const {
    toggleMode,
    setToggleMode,
    loadMovies,
    isLoading,
    user,
    logPage,
    wishlistFiltered
  } = useGlobalContext()

  // State of User Name
  const [userName, setUserName] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    setUserName(user) // Set local usename
    setToggleMode(localStorage.getItem('mode')) // Saved state of mode
  }, [isLoading, user, setToggleMode])

  const sideMenu = useRef(null)
  const back = useRef(null)
  const log = useRef(null)

  const toggle = mode => {
    if (mode === 'white') {
      setToggleMode('black')
      localStorage.setItem('mode', 'black')
    } else {
      setToggleMode('white')
      localStorage.setItem('mode', 'white')
    }
  }

  const showMenu = () => {
    sideMenu.current.style.transform = 'translateX(0%)'
    back.current.style.transform = 'translateX(0%)'
  }

  const showLogout = () => {
    //log.current.style.transform = 'translateX(0%)'
    log.current.style.opacity = '1'
    log.current.style.zIndex = '10'
    log.current.style.transform = 'scale(1)'
  }

  const showLog = () => {
    logPage.current.style.zIndex = '10'
    logPage.current.style.opacity = '1'
    logPage.current.style.transform = 'scale(1)'
  }

  return (
    <>
      <Logout log={log} />

      <SideNavigation sideMenu={sideMenu} back={back} />

      <div className='header'>
        <div className='header__content'>
          <h2
            className='header__content-title'
            onClick={() => {
              localStorage.setItem('activeGenre', 0)
              localStorage.setItem('genre', 'All')
              navigate('/')
              loadMovies('popular', 1)
            }}
          >
            Moviefy
          </h2>

          <div className='header__content__list'>
            <div className='header__content__list__options'>
              {/* Home */}

              {!window.location.pathname.includes('/bookmarks') &&
              !window.location.pathname.includes('/movie') &&
              !window.location.pathname.includes('/search') ? (
                <p className='option'>
                  <Link to='/' className='option-link'>
                    <i className='fa-solid fa-house activeLink option-link-icon'></i>
                    <span className='activeLink option-link-name'>Home</span>
                  </Link>
                </p>
              ) : (
                <p className='option'>
                  <Link to='/' className='option-link'>
                    <i className='fa-solid fa-house option-link-icon'></i>
                    <span className='option-link-name'>Home</span>
                  </Link>
                </p>
              )}

              {/* Search */}

              {window.location.pathname.includes('/search') ? (
                <p className='option'>
                  <Link to='/search' className='option-link'>
                    <i className='fa-solid fa-magnifying-glass activeLink option-link-icon'></i>
                    <span className='activeLink option-link-name'>Search</span>
                  </Link>
                </p>
              ) : (
                <p className='option'>
                  <Link to='/search' className='option-link'>
                    <i className='fa-solid fa-magnifying-glass option-link-icon'></i>
                    <span className='option-link-name'>Search</span>
                  </Link>
                </p>
              )}

              {/* Mode*/}

              {toggleMode === 'white' ? (
                <p className='option' onClick={() => toggle(toggleMode)}>
                  <Link to='#' className='option-link'>
                    <i className='fa-solid fa-moon option-link-icon'></i>
                    <span className='option-link-name'>Dark</span>
                  </Link>
                </p>
              ) : (
                <p className='option' onClick={() => toggle(toggleMode)}>
                  <Link to='#' className='option-link'>
                    <i className='fa-solid fa-sun option-link-icon'></i>
                    <span className='option-link-name'>Light</span>
                  </Link>
                </p>
              )}

              {/* Login  */}

              {!userName && (
                <p className='option' onClick={showLog}>
                  <Link to='#' className='option-link'>
                    <i className='fa-solid fa-circle-user option-link-icon'></i>
                    <span className='option-link-name'>Login</span>
                  </Link>
                </p>
              )}

              {/* Username */}

              {userName && (
                <p className='option' onClick={showLogout}>
                  <Link to='#' className='option-link'>
                    <i className='fa-solid fa-circle-user option-link-icon'></i>
                    <span className='option-link-name'>{userName}</span>
                  </Link>
                </p>
              )}

              {/* Wishlists */}

              {window.location.pathname.includes('/bookmarks') ? (
                <p className='option wish-link'>
                  <Link to='/bookmarks' className='option-link'>
                    <span
                      className='activeLink option-link-name'
                      style={{ padding: '0' }}
                    >
                      Wishlists
                    </span>
                    <span className='option-link-length activeLength'>
                      {wishlistFiltered.length}
                    </span>
                  </Link>
                </p>
              ) : (
                <p className='option wish-link'>
                  <Link to='/bookmarks' className='option-link'>
                    <span className='option-link-name' style={{ padding: '0' }}>
                      Wishlists
                    </span>
                    <span className='option-link-length inactiveLength'>
                      {wishlistFiltered.length}
                    </span>
                  </Link>
                </p>
              )}

              {/* More */}

              <p className='more option' onClick={showMenu}>
                <Link to='#' className='option-link'>
                  <i className='fa-solid fa-bars option-link-icon'></i>
                  <span className='option-link-name'>More</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
