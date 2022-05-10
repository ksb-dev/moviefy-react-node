import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

// Context
import { useGlobalContext } from '../../context/context'

const Categories = ({ sideMenu, back }) => {
  const { toggleMode, loadMovies } = useGlobalContext()

  const navigate = useNavigate()

  const hideMenu = () => {
    sideMenu.current.style.transform = 'translateX(100%)'
    back.current.style.transform = 'translateX(100%)'
  }

  const handleClick = category => {
    localStorage.setItem('genre', 'All')
    localStorage.setItem('activeGenre', 0)
    localStorage.setItem('category', category)

    loadMovies(category, 1)

    navigate('/')

    sideMenu.current.style.transform = 'translateX(100%)'
    back.current.style.transform = 'translateX(100%)'
  }

  return (
    <div
      ref={back}
      className={
        toggleMode === 'white'
          ? 'categories alphaLightBg1'
          : 'categories alphaDarkBg1'
      }
    >
      <div
        ref={sideMenu}
        className={
          toggleMode === 'white'
            ? 'categories__main lightBg2'
            : 'categories__main darkBg2'
        }
      >
        <ul
          className={
            toggleMode === 'white'
              ? 'categories__list darkColor1'
              : 'categories__list lightColor1'
          }
        >
          <li>
            <i className='fa-solid fa-xmark fa-2x' onClick={hideMenu}></i>
          </li>
          <li className='categories__wishlists' onClick={hideMenu}>
            <Link to='/bookmarks'>Wishlist</Link>
          </li>
          <li onClick={() => handleClick('popular')}>Popular</li>
          <li onClick={() => handleClick('trending')}>Trending</li>
          <li onClick={() => handleClick('now playing')}>In Cinemas</li>
          <li onClick={() => handleClick('upcoming')}>Upcoming</li>
          <li onClick={() => handleClick('top rated')}>Top Rated</li>
        </ul>
      </div>
    </div>
  )
}

export default Categories
