import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Context
import { useGlobalContext } from '../../context/context'

// Components
import Logout from '../Logout/Logout'
import Categories from '../Categories/Categories'

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

      {/* Categories Component */}

      <Categories sideMenu={sideMenu} back={back} />

      <div className='navigation'>
        <div className='navigation__main'>
          <h2
            className='navigation__title'
            onClick={() => {
              localStorage.setItem('activeGenre', 0)
              localStorage.setItem('genre', 'All')
              navigate('/')
              loadMovies('popular', 1)
            }}
          >
            Moviefy
          </h2>

          <div className='navigation__list'>
            <div className='navigation__options'>
              {/* Home */}

              {!window.location.pathname.includes('/bookmarks') &&
              !window.location.pathname.includes('/movie') &&
              !window.location.pathname.includes('/search') ? (
                <p>
                  <Link to='/'>
                    <i className='fa-solid fa-house activeLink'></i>
                    <span className='activeLink'>Home</span>
                  </Link>
                </p>
              ) : (
                <p>
                  <Link to='/'>
                    <i className='fa-solid fa-house'></i>
                    <span>Home</span>
                  </Link>
                </p>
              )}

              {/* Search */}

              {window.location.pathname.includes('/search') ? (
                <p>
                  <Link to='/search'>
                    <i className='fa-solid fa-magnifying-glass activeLink'></i>
                    <span className='activeLink'>Search</span>
                  </Link>
                </p>
              ) : (
                <p>
                  <Link to='/search'>
                    <i className='fa-solid fa-magnifying-glass'></i>
                    <span>Search</span>
                  </Link>
                </p>
              )}

              {/* Mode*/}

              {toggleMode === 'white' ? (
                <p onClick={() => toggle(toggleMode)}>
                  <i className='fa-solid fa-moon'></i>
                  <span>Dark</span>
                </p>
              ) : (
                <p onClick={() => toggle(toggleMode)}>
                  <i className='fa-solid fa-sun'></i>
                  <span>Light</span>
                </p>
              )}

              {/* Login  */}

              {!userName && (
                <p onClick={showLog}>
                  <Link to='#'>
                    <i className='fa-solid fa-circle-user'></i>
                    <span>Login</span>
                  </Link>
                </p>
              )}

              {/* Username */}

              {userName && (
                <p onClick={showLogout}>
                  <Link to='#'>
                    <i className='fa-solid fa-circle-user'></i>
                    <span>{userName}</span>
                  </Link>
                </p>
              )}

              {/* Wishlists */}

              {window.location.pathname.includes('/bookmarks') ? (
                <p className='wish-link'>
                  <Link to='/bookmarks'>
                    <span className='activeLink' style={{ padding: '0' }}>
                      Wishlists
                    </span>
                    <span className='length activeLength'>
                      {wishlistFiltered.length}
                    </span>
                  </Link>
                </p>
              ) : (
                <p className='wish-link'>
                  <Link to='/bookmarks'>
                    Wishlists
                    <span className='length inactiveLength'>
                      {wishlistFiltered.length}
                    </span>
                  </Link>
                </p>
              )}

              {/* More */}

              <p className='more' onClick={showMenu}>
                <Link to='#'>
                  <i class='fa-solid fa-bars'></i>
                  <span>More</span>
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
