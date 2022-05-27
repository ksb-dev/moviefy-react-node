import React from 'react'
import { Link } from 'react-router-dom'

import CountUp from 'react-countup'

// Context
import { useGlobalContext } from '../../context/context'

// Components
import Filter from '../Filter/Filter'

const SideMenu = ({ filtered }) => {
  const {
    toggleMode,
    activeGenre,
    setActiveGenre,
    loadMovies,
    category
  } = useGlobalContext()

  const handleClick = category => {
    localStorage.setItem('genre', 'All')
    localStorage.setItem('activeGenre', 0)
    localStorage.setItem('category', category)

    loadMovies(category, 1)
  }

  return (
    <div
      className={
        toggleMode === 'white' ? 'sideMenu lightBg1' : 'sideMenu darkBg1'
      }
    >
      <div
        className={
          toggleMode === 'white'
            ? 'sideMenu__main lightBg1'
            : 'sideMenu__main darkBg1'
        }
      >
        <ul
          className={
            toggleMode === 'white'
              ? 'sideMenu__list darkColor1'
              : 'sideMenu__list lightColor1'
          }
        >
          <li className='sideMenu__wishlists'>
            <Link to='/bookmarks'>Wishlist</Link>
          </li>

          {category && category === 'popular' ? (
            <li
              onClick={() => handleClick('popular')}
              className='activeCategory'
            >
              Popular
            </li>
          ) : (
            <li onClick={() => handleClick('popular')}>Popular</li>
          )}

          {category && category === 'trending' ? (
            <li
              onClick={() => handleClick('trending')}
              className='activeCategory'
            >
              Trending
            </li>
          ) : (
            <li onClick={() => handleClick('trending')}>Trending</li>
          )}

          {category && category === 'in cinemas' ? (
            <li
              onClick={() => handleClick('in cinemas')}
              className='activeCategory'
            >
              In Cinemas
            </li>
          ) : (
            <li onClick={() => handleClick('in cinemas')}>In Cinemas</li>
          )}

          {category && category === 'upcoming' ? (
            <li
              onClick={() => handleClick('upcoming')}
              className='activeCategory'
            >
              Upcoming
            </li>
          ) : (
            <li onClick={() => handleClick('upcoming')}>Upcoming</li>
          )}

          {category && category === 'top rated' ? (
            <li
              onClick={() => handleClick('top rated')}
              className='activeCategory'
            >
              Top Rated
            </li>
          ) : (
            <li onClick={() => handleClick('top rated')}>Top Rated</li>
          )}
        </ul>

        <div className='sideMenu__filter'>
          <Filter activeGenre={activeGenre} setActiveGenre={setActiveGenre} />

          <h2
            className={
              toggleMode === 'white'
                ? 'sideMenu__filter-counter darkBg1 lightColor1'
                : 'sideMenu__filter-counter lightBg1 darkColor1'
            }
          >
            <span>
              <CountUp start={0} end={filtered.length} duration={0.5} />
            </span>
          </h2>
        </div>
      </div>
    </div>
  )
}

export default SideMenu
