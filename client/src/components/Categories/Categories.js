import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Context
import { useGlobalContext } from '../../context/context'

const Categories = ({ sideMenu, back }) => {
  const { toggleMode, loadMovies, user } = useGlobalContext()

  const navigate = useNavigate()

  useEffect(() => {
    // Function for click event
    function handleOutsideClick (event) {
      if (
        back.current.contains(event.target) &&
        !sideMenu.current.contains(event.target)
      ) {
        //console.logPage('you just clicked outside of box!')
        back.current.style.transform = 'translateX(100%)'
      }
    }

    // Adding click event listener
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [back])

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
          ? 'categories alphaLightBg2'
          : 'categories alphaDarkBg2'
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
              : 'categories__list lightColor2'
          }
        >
          <li>
            <i className='fa-solid fa-xmark fa-2x' onClick={hideMenu}></i>
          </li>
          {/*<li className='categories__wishlists' onClick={hideMenu}>
            <Link to='/bookmarks'>Wishlists</Link>
        </li>*/}
          <li onClick={() => handleClick('popular')}>Popular</li>
          <li onClick={() => handleClick('trending')}>Trending</li>
          <li onClick={() => handleClick('in cinemas')}>In Cinemas</li>
          <li onClick={() => handleClick('upcoming')}>Upcoming</li>
          <li onClick={() => handleClick('top rated')}>Top Rated</li>
        </ul>
      </div>
    </div>
  )
}

export default Categories
