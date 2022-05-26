import React, { useEffect, useRef } from 'react'

import { useGlobalContext } from '../../context/context'

//import './Logout.css'

const Logout = ({ log }) => {
  const {
    toggleMode,
    setUser,
    setToken,
    setSearchMovie,
    setWishlist,
    setSearchTerm,
    setWishlistFiltered,
    loadMovies
  } = useGlobalContext()

  const logInner = useRef(null)

  useEffect(() => {
    // Function for click event
    function handleOutsideClick (event) {
      if (
        log.current.contains(event.target) &&
        !logInner.current.contains(event.target)
      ) {
        //console.log('you just clicked outside of box!')
        log.current.style.opacity = '0'
        log.current.style.zIndex = '-1'
        log.current.style.transform = 'scale(0)'
      }
    }

    // Adding click event listener
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [logInner, log])

  const hide = () => {
    //log.current.style.transform = 'translateX(100%)'
    log.current.style.opacity = '0'
    log.current.style.zIndex = '-1'
    log.current.style.transform = 'scale(0)'
  }

  const logout = () => {
    localStorage.removeItem('name')
    localStorage.removeItem('token')
    //localStorage.removeItem('term')
    //localStorage.removeItem('page')
    //localStorage.removeItem('category')
    //localStorage.setItem('genre', 'All')
    //localStorage.removeItem('activeGenre')
    localStorage.removeItem('term')
    localStorage.setItem('mode', 'white')
    localStorage.setItem('genre', 'All')
    localStorage.setItem('page', 1)
    localStorage.setItem('category', 'popular')
    localStorage.setItem('activeGenre', 0)
    loadMovies('popular', 1)
    setSearchMovie([])
    setWishlistFiltered([])
    setUser('')
    setToken('')
    setWishlist([])
    setSearchTerm('')

    //log.current.style.transform = 'translateX(0%)'
    log.current.style.opacity = '0'
    log.current.style.zIndex = '-1'
    //window.location.reload()
  }

  return (
    <div
      ref={log}
      className={
        toggleMode === 'white'
          ? 'log-back alphaLightBg2'
          : 'log-back alphaDarkBg2'
      }
    >
      <div
        ref={logInner}
        className={
          toggleMode === 'white'
            ? 'logout lightBg1 darkColor1'
            : 'logout darkBg1 lightColor1'
        }
      >
        <h4>Do you want to logout?</h4>
        <div className='logout__options'>
          <h5
            className={
              toggleMode === 'white'
                ? 'darkBg2 lightColor1'
                : 'lightBg2 darkColor1'
            }
            onClick={logout}
          >
            <span>Yes</span>
          </h5>
          <h5
            className={
              toggleMode === 'white'
                ? 'darkBg2 lightColor1'
                : 'lightBg2 darkColor1'
            }
            onClick={hide}
          >
            <span>No</span>
          </h5>
        </div>
      </div>
    </div>
  )
}

export default Logout
