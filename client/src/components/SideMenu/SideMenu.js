import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

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
    //wishlistFiltered
  } = useGlobalContext()

  const navigate = useNavigate()

  const handleClick = category => {
    localStorage.setItem('genre', 'All')
    localStorage.setItem('activeGenre', 0)
    localStorage.setItem('category', category)

    loadMovies(category, 1)

    navigate('/')
  }

  return (
    <div
      className={
        toggleMode === 'white' ? 'sideMenu lightBg2' : 'sideMenu darkBg2'
      }
    >
      <div
        className={
          toggleMode === 'white'
            ? 'sideMenu__main lightBg2'
            : 'sideMenu__main darkBg2'
        }
      >
        <ul
          className={
            toggleMode === 'white'
              ? 'sideMenu__list darkColor2'
              : 'sideMenu__list lightColor2'
          }
        >
          {/*<li className='sideMenu__wishlists'>
            <Link to='/bookmarks'>
              Wishlists
              <span className='lightColorBg1'>{wishlistFiltered.length}</span>
            </Link>
        </li>*/}

          {category &&
          category === 'popular' &&
          !window.location.pathname.includes('/bookmarks') &&
          !window.location.pathname.includes('/search') &&
          !window.location.pathname.includes('/movie') ? (
            <li
              onClick={() => handleClick('popular')}
              className={
                toggleMode === 'white'
                  ? 'activeCategory lightBg2'
                  : 'activeCategory darkBg2'
              }
            >
              Popular
            </li>
          ) : (
            <li
              className={toggleMode === 'white' ? 'lightBg2' : 'darkBg2'}
              onClick={() => handleClick('popular')}
            >
              Popular
            </li>
          )}

          {category &&
          category === 'trending' &&
          !window.location.pathname.includes('/bookmarks') &&
          !window.location.pathname.includes('/search') &&
          !window.location.pathname.includes('/movie') ? (
            <li
              onClick={() => handleClick('trending')}
              className={
                toggleMode === 'white'
                  ? 'activeCategory lightBg2'
                  : 'activeCategory darkBg2'
              }
            >
              Trending
            </li>
          ) : (
            <li
              className={toggleMode === 'white' ? 'lightBg2' : 'darkBg2'}
              onClick={() => handleClick('trending')}
            >
              Trending
            </li>
          )}

          {category &&
          category === 'in cinemas' &&
          !window.location.pathname.includes('/bookmarks') &&
          !window.location.pathname.includes('/search') &&
          !window.location.pathname.includes('/movie') ? (
            <li
              onClick={() => handleClick('in cinemas')}
              className={
                toggleMode === 'white'
                  ? 'activeCategory lightBg2'
                  : 'activeCategory darkBg2'
              }
            >
              In Cinemas
            </li>
          ) : (
            <li
              className={toggleMode === 'white' ? 'lightBg2' : 'darkBg2'}
              onClick={() => handleClick('in cinemas')}
            >
              In Cinemas
            </li>
          )}

          {category &&
          category === 'upcoming' &&
          !window.location.pathname.includes('/bookmarks') &&
          !window.location.pathname.includes('/search') &&
          !window.location.pathname.includes('/movie') ? (
            <li
              onClick={() => handleClick('upcoming')}
              className={
                toggleMode === 'white'
                  ? 'activeCategory lightBg2'
                  : 'activeCategory darkBg2'
              }
            >
              Upcoming
            </li>
          ) : (
            <li
              className={toggleMode === 'white' ? 'lightBg2' : 'darkBg2'}
              onClick={() => handleClick('upcoming')}
            >
              Upcoming
            </li>
          )}

          {category &&
          category === 'top rated' &&
          !window.location.pathname.includes('/bookmarks') &&
          !window.location.pathname.includes('/search') &&
          !window.location.pathname.includes('/movie') ? (
            <li
              onClick={() => handleClick('top rated')}
              className={
                toggleMode === 'white'
                  ? 'activeCategory lightBg2'
                  : 'activeCategory darkBg2'
              }
            >
              Top Rated
            </li>
          ) : (
            <li
              className={toggleMode === 'white' ? 'lightBg2' : 'darkBg2'}
              onClick={() => handleClick('top rated')}
            >
              Top Rated
            </li>
          )}

          {!window.location.pathname.includes('/bookmarks') &&
            !window.location.pathname.includes('/search') &&
            !window.location.pathname.includes('/movie') && (
              <p
                className={
                  toggleMode === 'white'
                    ? 'sideMenu__list-number lightBg1 darkColor2'
                    : 'sideMenu__list-number darkBg1 lightColor2'
                }
              >
                PAGE {localStorage.getItem('page')}
              </p>
            )}
        </ul>

        {!window.location.pathname.includes('/movie') &&
          !window.location.pathname.includes('/search') &&
          !window.location.pathname.includes('/bookmarks') && (
            <>
              <div className='sideMenu__filter'>
                {/*<p
                  className={
                    toggleMode === 'white'
                      ? 'sideMenu__filter-number lightBg1 darkColor2'
                      : 'sideMenu__filter-number darkBg1 lightColor2'
                  }
                >
                  PAGE {localStorage.getItem('page')}
                </p>*/}

                <Filter
                  activeGenre={activeGenre}
                  setActiveGenre={setActiveGenre}
                />

                <h2
                  className={
                    toggleMode === 'white'
                      ? 'sideMenu__filter-counter lightBg1 darkColor2'
                      : 'sideMenu__filter-counter darkBg1 lightColor2'
                  }
                >
                  <span>
                    <CountUp start={0} end={filtered.length} duration={0.5} />
                  </span>
                </h2>
              </div>
            </>
          )}
      </div>
    </div>
  )
}

export default SideMenu
