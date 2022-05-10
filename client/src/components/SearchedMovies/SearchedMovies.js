import React from 'react'

// Context
import { useGlobalContext } from '../../context/context'

// Components
import MovieCard from '../MovieCard/MovieCard'

// Styles
import './SearchedMovies.css'

const SearchedMovies = ({ setQuery }) => {
  const {
    searchMovie,
    isLoading,
    searchTerm,
    toggleMode,
    searchError,
    setSearchTerm,
    setSearchMovie
  } = useGlobalContext()

  if (isLoading) {
    return <div className='loading'></div>
  }

  return (
    <>
      {/* error */}

      {searchError.show && (
        <div
          className={
            toggleMode === 'white'
              ? 'err blackColorSearch'
              : 'err whiteColorSearch'
          }
        >
          {searchError.msg}
        </div>
      )}

      {/* movie Search*/}

      {searchTerm && (
        <div className='cat-clear'>
          <h4
            className={
              toggleMode === 'white'
                ? 'cat blackColorSearch'
                : 'cat whiteColorSearch'
            }
          >
            {searchTerm}
          </h4>

          <button
            className='clear-btn'
            onClick={() => {
              setSearchTerm('')
              setSearchMovie([])
              localStorage.setItem('term', '')
              setQuery('')
            }}
          >
            clear
          </button>
        </div>
      )}

      {/* single movie */}

      <section className='search-movie'>
        {searchMovie
          ? searchMovie.map(movie => {
              const {
                id,
                title,
                poster_path,
                release_date,
                vote_average
              } = movie

              return (
                <MovieCard
                  key={id}
                  movie={movie}
                  id={id}
                  title={title}
                  poster_path={poster_path}
                  vote_average={vote_average}
                  release_date={release_date}
                  marked={false}
                />
              )
            })
          : ''}
      </section>
    </>
  )
}

export default SearchedMovies
