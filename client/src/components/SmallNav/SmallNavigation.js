import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Context
import { useGlobalContext } from '../../context/context'

// Components
import Logout from '../Logout/Logout'
import Filter from '../Filter/Filter'
import Categories from '../Categories/Categories'

const SmallNav = () => {
  const {
    toggleMode,
    setToggleMode,
    loadMovies,
    isLoading,
    user,
    activeGenre,
    setActiveGenre
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
    log.current.style.transform = 'translateX(0%)'
  }

  return (
    <>
      <Logout log={log} />

      {/* Categories Component */}

      <Categories sideMenu={sideMenu} back={back} />

      <div
        className={
          toggleMode === 'white'
            ? 'small-navigation lightBg1'
            : 'small-navigation darkBg1'
        }
      >
        <div className='small-navigation__main'>
          <h2
            className={
              toggleMode === 'white'
                ? 'small-navigation__title darkColor1'
                : 'small-navigation__title lightColor1'
            }
            onClick={() => {
              localStorage.setItem('activeGenre', 0)
              localStorage.setItem('genre', 'All')
              navigate('/')
              loadMovies('popular', 1)
            }}
          >
            Moviefy
          </h2>

          <div className='small-navigation__list'>
            {/* Filter Component */}

            <div className='small-navigation__filter'>
              {window.location.pathname === '/' && (
                <Filter
                  activeGenre={activeGenre}
                  setActiveGenre={setActiveGenre}
                />
              )}
            </div>

            <div className='small-navigation__options'>
              {/* Home */}

              {(window.location.pathname === '/bookmarks' ||
                window.location.pathname.includes('/movie') ||
                window.location.pathname === '/search') && (
                <p>
                  <Link
                    to='/'
                    className={
                      toggleMode === 'white' ? 'darkColor1' : 'lightColor1'
                    }
                  >
                    <i className='fa-solid fa-house'></i>
                    <span>Home</span>
                  </Link>
                </p>
              )}

              {/* Search */}

              <p>
                <Link
                  to='/search'
                  className={
                    toggleMode === 'white' ? 'darkColor1' : 'lightColor1'
                  }
                >
                  <i
                    className={
                      toggleMode === 'white'
                        ? 'fa-solid fa-magnifying-glass darkColor1'
                        : 'fa-solid fa-magnifying-glass lightColor1'
                    }
                  ></i>
                  <span>Search</span>
                </Link>
              </p>

              {/* Mode*/}

              {toggleMode === 'white' ? (
                <p className='darkColor1' onClick={() => toggle(toggleMode)}>
                  <i className='fa-solid fa-moon darkColor1'></i>
                  <span>Dark</span>
                </p>
              ) : (
                <p className='lightColor1' onClick={() => toggle(toggleMode)}>
                  <i className='fa-solid fa-sun lightColor1'></i>
                  <span>Light</span>
                </p>
              )}

              {/* Login  */}

              {!userName && (
                <p>
                  <Link
                    to='/login'
                    className={
                      toggleMode === 'white' ? 'darkColor1' : 'lightColor1'
                    }
                  >
                    <i
                      className={
                        toggleMode === 'white'
                          ? 'fa-solid fa-circle-user darkColor1'
                          : 'fa-solid fa-circle-user lightColor1'
                      }
                    ></i>
                    <span>Login</span>
                  </Link>
                </p>
              )}

              {/* Username */}

              {userName && (
                <p onClick={showLogout}>
                  <Link
                    to='#'
                    className={
                      toggleMode === 'white' ? 'darkColor1' : 'lightColor1'
                    }
                  >
                    <i
                      className={
                        toggleMode === 'white'
                          ? 'fa-solid fa-circle-user darkColor1'
                          : 'fa-solid fa-circle-user lightColor1'
                      }
                    ></i>
                    <span>{userName}</span>
                  </Link>
                </p>
              )}

              {/* More */}

              {window.location.pathname.includes('/movie') ||
              window.location.pathname.includes('/bookmarks') ||
              window.location.pathname.includes('/search') ? (
                ''
              ) : (
                <p
                  className={
                    toggleMode === 'white'
                      ? ' more darkColor1'
                      : ' more lightColor1'
                  }
                  onClick={showMenu}
                >
                  <i
                    className={
                      toggleMode === 'white'
                        ? 'fa fa-bars-staggered darkColor1'
                        : 'fa fa-bars-staggered lightColor1'
                    }
                  ></i>
                  <span>More</span>
                </p>
              )}

              {window.location.pathname.includes('/movie') && (
                <p
                  className={
                    toggleMode === 'white'
                      ? ' movie-more darkColor1'
                      : ' movie-more lightColor1'
                  }
                  onClick={showMenu}
                >
                  <i
                    className={
                      toggleMode === 'white'
                        ? 'fa fa-bars-staggered darkColor1'
                        : 'fa fa-bars-staggered lightColor1'
                    }
                  ></i>
                  <span>More</span>
                </p>
              )}

              {window.location.pathname.includes('/bookmarks') && (
                <p
                  className={
                    toggleMode === 'white'
                      ? ' bookmarks-more darkColor1'
                      : ' boomarks-more lightColor1'
                  }
                  onClick={showMenu}
                >
                  <i
                    className={
                      toggleMode === 'white'
                        ? 'fa fa-bars-staggered darkColor1'
                        : 'fa fa-bars-staggered lightColor1'
                    }
                  ></i>
                  <span>More</span>
                </p>
              )}

              {window.location.pathname.includes('/search') && (
                <p
                  className={
                    toggleMode === 'white'
                      ? ' search-more darkColor1'
                      : ' search-more lightColor1'
                  }
                  onClick={showMenu}
                >
                  <i
                    className={
                      toggleMode === 'white'
                        ? 'fa fa-bars-staggered darkColor1'
                        : 'fa fa-bars-staggered lightColor1'
                    }
                  ></i>
                  <span>More</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SmallNav
