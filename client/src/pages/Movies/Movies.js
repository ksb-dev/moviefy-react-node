import React, { useEffect } from 'react'

import CountUp from 'react-countup'

// Context
import { useGlobalContext } from '../../context/context'

// Components
import MovieCard from '../../components/MovieCard/MovieCard'
import Pagination from '../../components/Pagination/Pagination'
import Navgation from '../../components/Navigation/Navigation'
import SideMenu from '../../components/SideMenu/SideMenu'
import SmallNav from '../../components/SmallNav/SmallNavigation'

const Movies = () => {
  let {
    isLoading,
    category,
    toggleMode,
    filtered,
    error,
    loadMovies
  } = useGlobalContext()

  useEffect(() => {}, [filtered])

  const handleClick = page => {
    if (category === 'popular') loadMovies('popular', page)
    if (category === 'trending') loadMovies('trending', page)
    if (category === 'now playing') loadMovies('now playing', page)
    if (category === 'upcoming') loadMovies('upcoming', page)
    if (category === 'top rated') loadMovies('top rated', page)
  }

  if (isLoading) {
    return <div className='loading'></div>
  }

  if (error.show) {
    return <div className='error'>{error.msg}</div>
  }

  return (
    <>
      <Navgation />

      <SmallNav />

      <SideMenu filtered={filtered} />

      <section className='movies'>
        {category && (
          <div className='category-length'>
            <h4 className='category'>
              <span
                className={
                  toggleMode === 'white' ? 'darkColor1' : 'lightColor1'
                }
              >
                {category}
              </span>
            </h4>

            <h4
              className={
                toggleMode === 'white'
                  ? 'length lightColorBg1'
                  : 'length darkColorBg1'
              }
            >
              <CountUp start={0} end={filtered.length} duration={0.1} />
            </h4>
          </div>
        )}

        <div className='movie-list'>
          {filtered.length > 0 &&
            filtered.map(movie => {
              const {
                id,
                title,
                poster_path,
                release_date,
                vote_average,
                genre_ids
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
                  genre_ids={genre_ids}
                />
              )
            })}

          {filtered.length === 0 && (
            <h3 style={{ color: 'tomato' }}>
              No {`${localStorage.getItem('genre')}`} movies found
            </h3>
          )}
        </div>
      </section>

      <Pagination
        data={filtered}
        pageLimit={5}
        dataLimit={20}
        handleClick={handleClick}
      />
    </>
  )
}

export default Movies
