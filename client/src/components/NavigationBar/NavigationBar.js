import React from 'react'
import { useNavigate } from 'react-router-dom'

import CountUp from 'react-countup'

// Context
import { useGlobalContext } from '../../context/context'

// Components
import Filter from '../Filter/Filter'
import Pagination from '../Pagination/Pagination'

const SideMenu = ({ filtered }) => {
  const {
    toggleMode,
    activeGenre,
    setActiveGenre,
    loadMovies,
    category
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
        toggleMode === 'white' ? 'navigation lightBg2' : 'navigation darkBg2'
      }
    >
      <div
        className={
          toggleMode === 'white'
            ? 'navigation__content tranparent'
            : 'navigation__content transparent'
        }
      >
        <ul
          className={
            toggleMode === 'white'
              ? 'navigation__options darkColor1'
              : 'navigation__options lightColor2'
          }
        >
          {category &&
          category === 'popular' &&
          !window.location.pathname.includes('/bookmarks') &&
          !window.location.pathname.includes('/search') &&
          !window.location.pathname.includes('/movie') ? (
            <li
              onClick={() => handleClick('popular')}
              className={
                toggleMode === 'white'
                  ? 'navigation__options-option activeCategory lightBg1'
                  : 'navigation__options-option  activeCategory darkBg1'
              }
            >
              Popular
            </li>
          ) : (
            <li
              className={
                toggleMode === 'white'
                  ? 'navigation__options-option lightBg1'
                  : 'navigation__options-option darkBg1'
              }
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
                  ? 'navigation__options-option activeCategory lightBg1'
                  : 'navigation__options-option activeCategory darkBg1'
              }
            >
              Trending
            </li>
          ) : (
            <li
              className={
                toggleMode === 'white'
                  ? 'navigation__options-option lightBg1'
                  : 'navigation__options-option darkBg1'
              }
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
              onClick={() => handleClick('now playing')}
              className={
                toggleMode === 'white'
                  ? 'navigation__options-option activeCategory lightBg1'
                  : 'navigation__options-option activeCategory darkBg1'
              }
            >
              Now Playing
            </li>
          ) : (
            <li
              className={
                toggleMode === 'white'
                  ? 'navigation__options-option lightBg1'
                  : 'navigation__options-option darkBg1'
              }
              onClick={() => handleClick('now playing')}
            >
              Now Playing
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
                  ? 'navigation__options-option activeCategory lightBg1'
                  : 'navigation__options-option activeCategory darkBg1'
              }
            >
              Upcoming
            </li>
          ) : (
            <li
              className={
                toggleMode === 'white'
                  ? 'navigation__options-option lightBg1'
                  : 'navigation__options-option darkBg1'
              }
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
                  ? 'navigation__options-option activeCategory lightBg1'
                  : 'navigation__options-option activeCategory darkBg1'
              }
            >
              Top Rated
            </li>
          ) : (
            <li
              className={
                toggleMode === 'white'
                  ? 'navigation__options-option lightBg1'
                  : 'navigation__options-option darkBg1'
              }
              onClick={() => handleClick('top rated')}
            >
              Top Rated
            </li>
          )}

          {!window.location.pathname.includes('/movie') &&
            !window.location.pathname.includes('/search') &&
            !window.location.pathname.includes('/bookmarks') && (
              <>
                <div className='navigation__filter'>
                  <Filter
                    activeGenre={activeGenre}
                    setActiveGenre={setActiveGenre}
                  />

                  <h2
                    className={
                      toggleMode === 'white'
                        ? 'navigation__filter-counter lightBg1 darkColor1'
                        : 'navigation__filter-counter darkBg1 lightColor2'
                    }
                  >
                    <span>
                      <CountUp start={0} end={filtered.length} duration={0.5} />
                    </span>
                  </h2>
                </div>
              </>
            )}
        </ul>

        {!window.location.pathname.includes('/movie') &&
          !window.location.pathname.includes('/search') &&
          !window.location.pathname.includes('/bookmarks') && (
            <div className='paginate-navigation'>
              <Pagination
                data={filtered}
                pageLimit={5}
                dataLimit={20}
                handleClick={handleClick}
              />
            </div>
          )}
      </div>
    </div>
  )
}

export default SideMenu
