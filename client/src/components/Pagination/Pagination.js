import React, { useState } from 'react'

import { useGlobalContext } from '../../context/context'

const Pagination = ({ data, pageLimit, dataLimit, handleClick }) => {
  const [pages] = useState(Math.round(data.length / dataLimit))

  const { page, toggleMode, loadMovies } = useGlobalContext()

  const storedPage = Number(localStorage.getItem('page'))

  const number = storedPage !== 0 ? storedPage : page

  //console.log(storedPage, number)

  //console.log(number)

  function goToNextPage (e) {
    // not yet implemented
    //setPage(page => page + 1)

    const pageNumber = Number(localStorage.getItem('page'))
    const storedCategory = localStorage.getItem('category') || 'popular'

    loadMovies(storedCategory, pageNumber + 1)

    /*if (category === 'popular') loadMovies('popular', page + 1)
    if (category === 'trending') loadMovies('trending', page + 1)
    if (category === 'now playing') loadMovies('now playing', page + 1)
    if (category === 'upcoming') loadMovies('upcoming', page + 1)
    if (category === 'top rated') loadMovies('top rated', page + 1)*/
  }

  function goToPreviousPage () {
    // not yet implemented
    //setPage(page => page - 1)

    const pageNumber = Number(localStorage.getItem('page'))
    const storedCategory = localStorage.getItem('category') || 'popular'

    loadMovies(storedCategory, pageNumber - 1)

    /*if (category === 'popular') loadMovies('popular', page - 1)
    if (category === 'trending') loadMovies('trending', page - 1)
    if (category === 'now playing') loadMovies('now playing', page - 1)
    if (category === 'upcoming') loadMovies('upcoming', page - 1)
    if (category === 'top rated') loadMovies('top rated', page - 1)*/
  }

  function changePage (e) {
    // not yet implemented
    const pageNumber = Number(e.target.textContent)
    const storedCategory = localStorage.getItem('category') || 'popular'

    loadMovies(storedCategory, pageNumber)

    /*if (category === 'popular') loadMovies('popular', pageNumber)
    if (category === 'trending') loadMovies('trending', pageNumber)
    if (category === 'now playing') loadMovies('now playing', pageNumber)
    if (category === 'upcoming') loadMovies('upcoming', pageNumber)
    if (category === 'top rated') loadMovies('top rated', pageNumber)*/
  }

  const getPaginationGroup = () => {
    // not yet implemented
    let start = Math.floor((number - 1) / pageLimit) * pageLimit
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1)
  }

  return (
    <div>
      <div
        className={
          toggleMode === 'white' ? 'pagination lightBg1' : 'pagination darkBg1'
        }
      >
        {/* previous button */}
        <div
          className={
            toggleMode === 'white' ? 'inner lightBg2' : 'inner darkBg2'
          }
        >
          <button
            onClick={goToPreviousPage}
            className={
              toggleMode === 'white'
                ? ` ${number === 1 ? 'prev disabled' : 'prevNextLight'}`
                : ` ${number === 1 ? 'prev disabled' : 'prevNextDark'}`
            }
          >
            <i className='fa-solid fa-circle-chevron-left fa-2x left'></i>
            <i className='fa-solid fa-circle-chevron-up fa-2x up'></i>
          </button>

          {/* show page numbers */}

          {getPaginationGroup().map((item, index) => (
            <button
              key={index}
              onClick={changePage}
              className={
                toggleMode === 'white'
                  ? `paginationItem  ${
                      number === item ? 'lightActive' : 'lightNumber'
                    } `
                  : `paginationItem  ${
                      number === item ? 'darkActive' : 'darkNumber'
                    } `
              }
            >
              <span>{item}</span>
            </button>
          ))}

          {/* next button */}
          <button
            onClick={goToNextPage}
            className={
              toggleMode === 'white'
                ? ` ${
                    number === pages ? 'next prevNextLight' : 'prevNextLight'
                  }`
                : ` ${number === pages ? 'next prevNextDark' : 'prevNextDark'}`
            }
          >
            <i className='fa-solid fa-circle-chevron-right fa-2x right'></i>
            <i className='fa-solid fa-circle-chevron-down fa-2x down'></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Pagination
