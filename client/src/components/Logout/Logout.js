import React from 'react'

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

  const hide = () => {
    log.current.style.transform = 'translateX(100%)'
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

    log.current.style.transform = 'translateX(100%)'
    //window.location.reload()
  }

  return (
    <div
      ref={log}
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
  )
}

export default Logout
